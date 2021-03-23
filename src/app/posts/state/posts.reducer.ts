import { createReducer, on } from '@ngrx/store';
import { loadPostsSuccess } from './post.action';
import { initialState, PostState } from './post.state';

const _postsReducer = createReducer(
  initialState,
  on(
    loadPostsSuccess,
    (state: PostState, action: any): PostState => {
      return {
        ...state,
        posts: action.posts,
        totalPosts: action.totalElements,
        pageIndex: action.number,
        pageSize: action.size,
      };
    }
  )
);

export function PostsReducer(state: PostState, action: any): PostState {
  return _postsReducer(state, action);
}
