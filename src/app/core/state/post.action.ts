import { createAction, props } from '@ngrx/store';
import { Post } from '../model/post.model';

export const POSTS_REQUEST = '[home page] posts request';

export const POSTS_SUCCESS = '[home page] posts success';

export const POSTS_FAIL = '[home page] posts fail';

export const postsRequest = createAction(
  POSTS_REQUEST,
  props<{ pageIndex: number; pageSize: number }>()
);

export const postsSuccess = createAction(
  POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);

export const postsFail = createAction(POSTS_FAIL);
