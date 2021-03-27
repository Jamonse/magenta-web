import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROUTER_STATE_NAME } from 'src/app/state/app.state';
import { RouterStateUrl } from './router.serializer';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>(ROUTER_STATE_NAME);

export const getCurrentRoute = createSelector(getRouterState, (router) => {
  return router.state;
});
