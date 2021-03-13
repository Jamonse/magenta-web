import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { loginRequest, logoutAction } from './auth.actions';
import { getJwt } from './auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store<AppState>) {}

  performLogin(email: string, password: string): void {
    this.store.dispatch(loginRequest({ email, password }));
  }

  performLogout(): void {
    this.store.dispatch(logoutAction());
  }

  getJwt(): Observable<string | null> {
    return this.store.select(getJwt);
  }
}
