import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutAction, refreshSuccess } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: AuthState, action: any) => {
    return { ...state, user: action.user };
  }),
  on(logoutAction, (state: AuthState, action: any) => {
    return { ...state, user: null };
  }),
  on(refreshSuccess, (state: AuthState, action: any) => {
    return { ...state, jwt: action.jwt };
  })
);

export function AuthReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
