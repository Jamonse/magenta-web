import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getJwt = createSelector(getAuthState, (state) => {
  return state.user ? state.user.jwt : null;
});

export const getRefreshToken = createSelector(getAuthState, (state) => {
  return state.user ? state.user.refreshToken : null;
});

export const getUser = createSelector(getAuthState, (state) => {
  return state.user ? state.user.user : null;
});

export const getPermissions = createSelector(getAuthState, (state) => {
  return state.user ? state.user.user.privileges : null;
});
