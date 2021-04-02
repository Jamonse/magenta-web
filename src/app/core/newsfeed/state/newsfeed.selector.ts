import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewsfeedState } from './newsfeed.state';

export const NEWSFEED_STATE_NAME = 'newsfeed';

export const getNewsfeedState = createFeatureSelector<NewsfeedState>(
  NEWSFEED_STATE_NAME
);

export const getNewsfeed = createSelector(
  getNewsfeedState,
  (state) => state.posts
);
