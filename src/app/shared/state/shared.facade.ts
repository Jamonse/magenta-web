import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { displayErrorMessage, displayLoading } from './shared.actions';
import { getErrorMessage, getLoading } from './shared.selector';

@Injectable({ providedIn: 'root' })
export class SharedFacade {
  constructor(private store: Store<AppState>) {}

  getLoading(): Observable<boolean> {
    return this.store.select(getLoading);
  }

  getErrorMessage(): Observable<string> {
    return this.store.select(getErrorMessage);
  }

  displayLoading(): void {
    this.alterLoading(true);
  }

  hideLoading(): void {
    this.alterLoading(false);
  }

  clearError(): void {
    this.store.dispatch(displayErrorMessage({ message: '' }));
  }

  // Handles a generic observables subscriptions and displays loading indicator accordingly
  displayLoadingUntil<T>(observable$: Observable<T>): Observable<T> {
    let loadingFinished = false;
    return of(null).pipe(
      tap(() => {
        // Display loading only if it is not finish yet
        if (!loadingFinished) {
          this.displayLoading();
        }
      }),
      concatMap(() => observable$), // Return each observable after it completes sequentialy
      finalize(() => {
        // Set loading finish status to true and hide loading indicator
        loadingFinished = true;
        this.hideLoading();
      })
    );
  }

  private alterLoading(status: boolean): void {
    this.store.dispatch(displayLoading({ status: status }));
  }
}
