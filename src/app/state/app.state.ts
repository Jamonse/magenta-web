import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { SharedReducer } from '../shared/state/shared.reducer';
import { SHARED_STATE_NAME } from '../shared/state/shared.selector';
import { SharedState } from '../shared/state/shared.state';

export const ROUTER_STATE_NAME = 'router';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [ROUTER_STATE_NAME]: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [ROUTER_STATE_NAME]: routerReducer,
};
