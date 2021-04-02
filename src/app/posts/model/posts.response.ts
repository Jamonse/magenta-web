import { PostSortType } from '../util/posts.util';
import { Post } from './post.model';

export interface PostsResponse {
  content: Post[];
  totalElements: number;
  pageIndex: number;
  pageSize: number;
  sortBy: PostSortType;
  sortDirection: boolean;
}
