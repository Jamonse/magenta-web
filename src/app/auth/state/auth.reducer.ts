import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutAction } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: AuthState, action: any) => {
    return { ...state, user: action.user };
  }),
  on(logoutAction, (state: AuthState, action: any) => {
    return { ...state, user: null };
  })
);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
