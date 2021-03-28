import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { displayErrorMessage } from 'src/app/shared/state/shared.actions';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { PostsService } from '../service/posts.service';
import { loadPosts, loadPostsSuccess, loadPostSuccess } from './post.action';
import { PostsFacade } from './posts.facade';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostsService,
    private sharedFacade: SharedFacade,
    private facade: PostsFacade
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
      ofType(ROUTER_NAVIGATION), // Listen for router navigation action to posts url
      filter((route: RouterNavigatedAction) => {
        const url = route.payload.routerState.url;
        return (
          url.startsWith('/posts/edit') || url.startsWith('/posts/details')
        );
      }), // Get id from url prarms
      map((route: any) => route.payload.routerState['params']['id']),
      withLatestFrom(this.facade.getPostsPage()), // Get current loaded posts from state
      switchMap(([postId, posts]) => {
        if (posts) {
          // Search if requested post already exists in state
          const post = posts.content.find((post) => post.id === postId);
          if (post) {
            // Return the post if found
            return of(loadPostSuccess({ post: post }));
          }
        } // Otherwise perform an API call to get the post
        return this.postsService
          .getPostById(postId)
          .pipe(map((post) => loadPostSuccess({ post: post })));
      })
    );
  });
}
