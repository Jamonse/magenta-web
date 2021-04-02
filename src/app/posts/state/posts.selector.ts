import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.state';
import { PostsResponse } from '../model/posts.response';

export const POSTS_STATE_NAME = 'posts';

export const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_NAME);

export const getPostsPage = createSelector(getPostsState, (state) => {
  return state.posts
    ? ({
        content: state.posts,
        totalElements: state.totalPosts,
        sortBy: state.sortBy,
        sortDirection: state.asc,
      } as PostsResponse)
    : null;
});

export const getPostById = createSelector(getPostsState, (state) => {
  return state.loadedPost;
});

export const getSearchedPosts = createSelector(getPostsState, (state) => {
  return state.searchedPosts;
});
