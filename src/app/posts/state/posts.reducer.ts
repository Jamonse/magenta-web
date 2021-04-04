import { createReducer, on } from '@ngrx/store';
import {
  loadPostsSuccess,
  loadPostSuccess,
  searchPostsSuccess,
} from './post.action';
import { postInitialState, PostState } from './post.state';
import { PostsResponse } from '../model/posts.response';

const _postsReducer = createReducer(
  postInitialState,
  on(
    loadPostsSuccess,
    (state: PostState, action: any): PostState => {
      const postsPageData: PostsResponse = action.postsPageData;
      return {
        ...state,
        posts: postsPageData.content ? postsPageData.content : [],
        totalPosts: postsPageData.totalElements,
        pageIndex: postsPageData.pageIndex,
        pageSize: postsPageData.pageSize,
        sortBy: postsPageData.sortBy,
        asc: postsPageData.sortDirection,
      };
    }
  ),
  on(loadPostSuccess, (state: PostState, action: any) => {
    return { ...state, loadedPost: action.post };
  }),
  on(searchPostsSuccess, (state: PostState, action: any) => {
    return { ...state, searchedPosts: action.searchResults };
  })
);

export function PostsReducer(state: PostState, action: any): PostState {
  return _postsReducer(state, action);
}
