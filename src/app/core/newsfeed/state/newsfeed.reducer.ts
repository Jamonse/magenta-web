import { createReducer, on } from '@ngrx/store';
import {
  loadPostsBatchSuccess,
  postArrived,
  postDeleted,
  postUpdated,
} from './newsfeed.action';
import { initialState, NewsfeedState } from './newsfeed.state';

const _newsfeedReducer = createReducer(
  initialState,
  on(loadPostsBatchSuccess, (state: NewsfeedState, action: any) => {
    const newsfeed = state.posts;
    newsfeed.concat(action.postsBatch);
    return { ...state, posts: newsfeed };
  }),
  on(postArrived, (state: NewsfeedState, action: any) => {
    const newsfeed = state.posts;
    newsfeed.push(action.post);
    return { ...state, posts: newsfeed };
  }),
  on(postUpdated, (state: NewsfeedState, action: any) => {
    const newsfeed = state.posts;
    const index = newsfeed.indexOf(action.post);
    if (index) {
      newsfeed[index] = action.post;
    }
    return { ...state, posts: newsfeed };
  }),
  on(postDeleted, (state: NewsfeedState, action: any) => {
    const newsfeed = state.posts;
    const index = newsfeed.indexOf(action.post);
    if (index) {
      newsfeed.splice(index, 1);
    }
    return { ...state, posts: newsfeed };
  })
);

export function NewsfeedReducer(state: NewsfeedState, action: any) {
  return _newsfeedReducer(state, action);
}
