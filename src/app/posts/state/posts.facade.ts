import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  INITIAL_ASC,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { PostsResponse } from '../model/posts.response';
import { PostSortType, POST_INITIAL_SORT_TYPE } from '../util/posts.util';
import { loadPosts } from './post.action';
import { PostState } from './post.state';
import { getPostsPage } from './posts.selector';

@Injectable({ providedIn: 'root' })
export class PostsFacade {
  constructor(private store: Store<PostState>) {}

  loadPosts(
    pageIndex: number = INITIAL_PAGE_INDEX,
    pageSize: number = INITIAL_PAGE_SIZE,
    sortBy: PostSortType = POST_INITIAL_SORT_TYPE,
    asc: boolean = INITIAL_ASC
  ): void {
    this.store.dispatch(
      loadPosts({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        asc: asc,
      })
    );
  }

  getPostsPage(): Observable<PostsResponse | null> {
    return this.store.select(getPostsPage);
  }
}
