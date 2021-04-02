import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/posts/model/post.model';

const HOME_PAGE_NAME = '[home page]';

export const LOAD_POSTS_BATCH = `${HOME_PAGE_NAME} load posts batch`;
export const LOAD_POSTS_BATCH_SUCCESS = `${HOME_PAGE_NAME} load posts batch success`;

export const POST_ARRIVED = `${HOME_PAGE_NAME} post arrived`;

export const POST_UPDATED = `${HOME_PAGE_NAME} post updated`;

export const POST_DELETED = `${HOME_PAGE_NAME} post deleted`;

export const OPEN_SSE_CONNECTION = `${HOME_PAGE_NAME} open connection`;

export const loadPostsBatch = createAction(
  LOAD_POSTS_BATCH,
  props<{ pageIndex: number }>()
);
export const loadPostsBatchSuccess = createAction(
  LOAD_POSTS_BATCH_SUCCESS,
  props<{ postsBatch: Post[] }>()
);

export const postArrived = createAction(POST_ARRIVED, props<{ post: Post }>());

export const postUpdated = createAction(POST_UPDATED, props<{ post: Post }>());

export const postDeleted = createAction(
  POST_DELETED,
  props<{ postId: number }>()
);

export const openConnection = createAction(OPEN_SSE_CONNECTION);
