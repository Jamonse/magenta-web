import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Privilege } from '../model/privilege.model';
import { User } from '../model/user.model';
import {
  clearJwt,
  loginRequest,
  logoutAction,
  refreshRequest,
} from './auth.actions';
import {
  getJwt,
  getPermissions,
  getRefreshToken,
  getUser,
} from './auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store<AppState>) {}

  performLogin(email: string, password: string): void {
    this.store.dispatch(loginRequest({ email, password }));
  }

  performLogout(): void {
    this.store.dispatch(logoutAction());
  }

  refreshJwt(refreshToken: string): void {
    this.store.dispatch(refreshRequest({ refreshToken: refreshToken }));
  }

  getJwt(): Observable<string | null> {
    return this.store.select(getJwt);
  }

  getRefreshToken(): Observable<string | null> {
    return this.store.select(getRefreshToken);
  }

  clearJwt(): void {
    this.store.dispatch(clearJwt());
  }

  getUser(): Observable<User | null> {
    return this.store.select(getUser);
  }

  getPermissions(): Observable<Privilege[] | null> {
    return this.store.select(getPermissions);
  }
}
