import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { displayErrorMessage } from 'src/app/shared/state/shared.actions';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { Post } from '../model/post.model';
import { PostsService } from '../service/posts.service';
import { loadPosts, loadPostsSuccess, loadPostSuccess } from './post.action';
import { PostState } from './post.state';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostsService,
    private sharedFacade: SharedFacade,
    private store: Store<PostState>
  ) {}

  loadPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        this.sharedFacade.displayContentLoading();
        return this.postsService
          .getPostsPage(
            action.pageIndex,
            action.pageSize,
            action.sortBy,
            action.asc
          )
          .pipe(
            map((postsResponse) => {
              this.sharedFacade.hideContentLoading();
              return loadPostsSuccess({ postsPageData: postsResponse });
            }),
            catchError((err) => {
              return of(
                displayErrorMessage({ message: 'An unexpected error occurred' })
              );
            }),
            finalize(() => this.sharedFacade.hideContentLoading())
          );
      })
    )
  );

  loadPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((route: RouterNavigatedAction) =>
        route.payload.routerState.url.startsWith('/posts')
      ),
      map((route: RouterNavigatedAction) => route.payload.routerState['root']),
      switchMap((postId) => {
        return this.postsService
          .getPostById(1)
          .pipe(map((post) => loadPostSuccess({ post: post })));
      })
    );
  });
}
