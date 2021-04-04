import { createReducer, on } from '@ngrx/store';
import { UserData } from '../model/user-data.model';
import {
  clearJwt,
  loginSuccess,
  logoutAction,
  refreshSuccess,
} from './auth.actions';
import { AuthState, authInitialState } from './auth.state';

const _authReducer = createReducer(
  authInitialState,
  on(loginSuccess, (state: AuthState, action: any) => {
    const userData: UserData = action.user;
    return {
      ...state,
      user: userData.user,
      jwt: userData.jwt,
      refreshToken: userData.refreshToken,
    };
  }),
  on(logoutAction, (state: AuthState, action: any) => {
    return { ...state, user: null };
  }),
  on(refreshSuccess, (state: AuthState, action: any) => {
    return { ...state, jwt: action.jwt };
  }),
  on(clearJwt, (state: AuthState, action: any) => {
    return { ...state, jwt: null };
  })
);

export function AuthReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
