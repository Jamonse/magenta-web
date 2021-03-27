import { createReducer, on } from '@ngrx/store';
import { loadPostsSuccess, loadPostSuccess } from './post.action';
import { initialState, PostState } from './post.state';
import { PostsResponse } from '../model/posts.response';

const _postsReducer = createReducer(
  initialState,
  on(
    loadPostsSuccess,
    (state: PostState, action: any): PostState => {
      const postsPageData: PostsResponse = action.postsPageData;
      return {
        ...state,
        posts: postsPageData.content ? postsPageData.content : [],
        totalPosts: postsPageData.totalElements,
        pageIndex: postsPageData.pageNumber,
        pageSize: postsPageData.pageSize,
      };
    }
  ),
  on(loadPostSuccess, (state: PostState, action: any) => {
    return { ...state, loadedPost: action.post };
  })
);

export function PostsReducer(state: PostState, action: any): PostState {
  return _postsReducer(state, action);
}
