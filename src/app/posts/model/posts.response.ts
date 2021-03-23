import { Post } from './post.model';

export interface PostsResponse {
  content: Post[];
  totalElements: number;
  size: number;
  number: number;
}
