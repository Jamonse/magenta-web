import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.state';

export const POSTS_STATE_NAME = 'posts';

export const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_NAME);

export const getPostsPage = createSelector(getPostsState, (state) => {
  return state.posts ? state.posts : null;
});
