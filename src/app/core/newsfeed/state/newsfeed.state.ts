import { Post } from 'src/app/posts/model/post.model';

export interface NewsfeedState {
  posts: Post[];
}

export const newsfeedInitialState: NewsfeedState = {
  posts: [],
};
