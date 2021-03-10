import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loginRequest } from './auth.actions';

@Injectable()
export class AuthFacade {
  constructor(private store: Store<AppState>) {}

  performLogin(email: string, password: string): void {
    this.store.dispatch(loginRequest({ email, password }));
  }
}
