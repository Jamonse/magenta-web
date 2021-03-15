import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Theme } from '../model/theme.model';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getJwt = createSelector(getAuthState, (state) => {
  return state.user ? state.user.jwt : null;
});

export const getTheme = createSelector(getAuthState, (state) => {
  return state.user ? state.user.user.preferedTheme : Theme.LIGHT;
});
