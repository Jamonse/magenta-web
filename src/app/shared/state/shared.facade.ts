import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  private alterLoading(status: boolean): void {
    this.store.dispatch(displayLoading({ status: status }));
  }
}
