import {
  INITIAL_ASC,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { Post } from '../model/post.model';
import { PostSortType, POST_INITIAL_SORT_TYPE } from '../util/posts.util';

export interface PostState {
  posts: Post[];
  searchedPosts: Post[];
  totalPosts: number;
  pageIndex: number;
  pageSize: number;
  sortBy: PostSortType;
  asc: boolean;
  loadedPost: Post | null;
}

export const initialState: PostState = {
  posts: [],
  searchedPosts: [],
  totalPosts: 0,
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
  sortBy: POST_INITIAL_SORT_TYPE,
  asc: INITIAL_ASC,
  loadedPost: null,
};
