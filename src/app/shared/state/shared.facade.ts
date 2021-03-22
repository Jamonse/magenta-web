import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {
  displayContentLoading,
  displayErrorMessage,
  displayGeneralLoading,
} from './shared.actions';
import {
  getContentLoading,
  getErrorMessage,
  getGeneralLoading,
} from './shared.selector';

@Injectable({ providedIn: 'root' })
export class SharedFacade {
  constructor(private store: Store<AppState>) {}

  getGeneralLoading(): Observable<boolean> {
    return this.store.select(getGeneralLoading);
  }

  getContentLoading(): Observable<boolean> {
    return this.store.select(getContentLoading);
  }

  getErrorMessage(): Observable<string> {
    return this.store.select(getErrorMessage);
  }

  displayGeneralLoading(): void {
    this.alterGeneralLoading(true);
  }

  hideGeneralLoading(): void {
    this.alterGeneralLoading(false);
  }

  displayContentLoading(): void {
    this.alterContentLoading(true);
  }

  hideContentLoading(): void {
    this.alterContentLoading(false);
  }

  clearError(): void {
    this.store.dispatch(displayErrorMessage({ message: '' }));
  }

  private alterGeneralLoading(status: boolean): void {
    this.store.dispatch(displayGeneralLoading({ status: status }));
  }

  private alterContentLoading(status: boolean): void {
    this.store.dispatch(displayContentLoading({ status: status }));
  }
}
