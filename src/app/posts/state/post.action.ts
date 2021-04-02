import { createAction, props } from '@ngrx/store';
import {
  ASC,
  PAGE_INDEX,
  PAGE_SIZE,
  SORT_BY,
} from 'src/app/shared/utils/pagination.util';
import { Post } from '../model/post.model';
import { PostSearchResult } from '../model/post.search-result';
import { PostsResponse } from '../model/posts.response';
import { PostSortType } from '../util/posts.util';

const POSTS_PAGE_NAME = '[posts page]';

export const LOAD_POSTS = `${POSTS_PAGE_NAME} load posts`;
export const LOAD_POSTS_SUCCESS = `${POSTS_PAGE_NAME} load posts success`;

export const LOAD_POST = `${POSTS_PAGE_NAME} load post`;
export const LOAD_POST_SUCCESS = `${POSTS_PAGE_NAME} load post success`;

export const SEARCH_POSTS = `${POSTS_PAGE_NAME} search posts`;
export const SEARCH_POSTS_SUCCESS = `${POSTS_PAGE_NAME} search posts success`;

export const CREATE_POST = `${POSTS_PAGE_NAME} create post`;
export const CREATE_POST_SUCCESS = `${POSTS_PAGE_NAME} create post success`;

export const UPDATE_POST = `${POSTS_PAGE_NAME} update post`;
export const UPDATE_POST_SUCCESS = `${POSTS_PAGE_NAME} update post success`;

export const DELETE_POST = `${POSTS_PAGE_NAME} delete post`;
export const DELETE_POST_SUCCESS = `${POSTS_PAGE_NAME} delete post success`;

export const loadPosts = createAction(
  LOAD_POSTS,
  props<{
    [PAGE_INDEX]: number;
    [PAGE_SIZE]: number;
    [SORT_BY]: PostSortType;
    [ASC]: boolean;
  }>()
);

export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ postsPageData: PostsResponse }>()
);

export const loadPost = createAction(LOAD_POST, props<{ postId: number }>());

export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const searchPosts = createAction(
  SEARCH_POSTS,
  props<{ text: string; resultsCount?: number }>()
);
export const searchPostsSuccess = createAction(
  SEARCH_POSTS_SUCCESS,
  props<{ searchResults: PostSearchResult[] }>()
);

export const createPost = createAction(CREATE_POST, props<{ post: Post }>());
export const createPostSuccess = createAction(
  CREATE_POST_SUCCESS,
  props<{ post: Post }>()
);

export const updatePost = createAction(UPDATE_POST, props<{ post: Post }>());
export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Post }>()
);

export const deletePost = createAction(
  DELETE_POST,
  props<{ postId: number }>()
);

export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
