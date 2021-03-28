import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import {
  INITIAL_ASC,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { Post } from '../model/post.model';
import { PostsResponse } from '../model/posts.response';
import { PostsRoutingService } from '../service/posts-routing.service';
import { PostSortType, POST_INITIAL_SORT_TYPE } from '../util/posts.util';
import { loadPosts } from './post.action';
import { PostState } from './post.state';
import { getPostById, getPostsPage } from './posts.selector';

@Injectable({ providedIn: 'root' })
export class PostsFacade {
  constructor(
    private store: Store<PostState>,
    private postsRoutingService: PostsRoutingService
  ) {}

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

  getPostById(): Observable<Post | null> {
    return this.store.select(getPostById);
  }

  isFormUpdateMode(): boolean {
    return this.postsRoutingService.isUpdateForm();
  }

  navigateToBackPage(): void {
    this.postsRoutingService.backPage();
  }
}
