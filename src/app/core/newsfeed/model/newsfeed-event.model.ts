import { Post } from 'src/app/posts/model/post.model';
import { NewsfeedEventType } from './newsfeed-event.type';

export interface NewsfeedEvent {
  post: Post;
  postId?: number;
  eventType: NewsfeedEventType;
}
