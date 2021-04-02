import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { displayErrorMessage } from 'src/app/shared/state/shared.actions';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { PostsService } from '../service/posts.service';
import {
  createPost,
  createPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  loadPostSuccess,
  searchPosts,
  searchPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './post.action';
import { PostsFacade } from './posts.facade';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostsService,
    private sharedFacade: SharedFacade,
    private postsFacade: PostsFacade
  ) {}

  loadPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        this.sharedFacade.displayContentLoading(); // Dispaly content loading
        return this.postsService // Load posts with page detail from action
          .getPostsPage(
            action.pageIndex,
            action.pageSize,
            action.sortBy,
            action.asc
          )
          .pipe(
            // Upon successfull response, return action with received content
            map((postsResponse) => {
              this.sharedFacade.hideContentLoading();
              return loadPostsSuccess({ postsPageData: postsResponse });
            }), // Handle failure message display in case of error in response
            catchError(this.handleError),
            // Hide content loading upon completion
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
      withLatestFrom(this.postsFacade.getPostsPage()), // Get current loaded posts from state
      switchMap(([postId, posts]) => {
        if (posts) {
          // Search if requested post already exists in state
          const post = posts.content.find((post) => post.id == postId);
          if (post) {
            // Return the post if found
            return of(loadPostSuccess({ post: post }));
          }
        } // Otherwise perform an API call to get the post
        return this.postsService.getPostById(postId).pipe(
          map((post) => loadPostSuccess({ post: post })),
          catchError(this.handleError)
        );
      })
    );
  });

  searchPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(searchPosts),
      switchMap((action) => {
        return this.postsService
          .searchPosts(action.text, action.resultsCount)
          .pipe(
            map((searchResults) =>
              searchPostsSuccess({ searchResults: searchResults })
            ),
            catchError(this.handleError)
          );
      })
    );
  });

  createPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createPost),
      mergeMap((action) => {
        this.sharedFacade.displayContentLoading();
        return this.postsService.createPost(action.post).pipe(
          map((post) => createPostSuccess({ post: post })),
          catchError(this.handleError)
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        this.sharedFacade.displayContentLoading();
        return this.postsService.updatePost(action.post).pipe(
          map((post) => updatePostSuccess({ post: post })),
          catchError(this.handleError)
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        this.sharedFacade.displayContentLoading();
        return this.postsService.deletePost(action.postId).pipe(
          map(() => deletePostSuccess()),
          catchError(this.handleError)
        );
      })
    );
  });

  postsPageRedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(createPostSuccess, updatePostSuccess, deletePostSuccess),
        withLatestFrom(this.postsFacade.getPostsPage()),
        tap(([action, postsPage]) => {
          this.sharedFacade.hideContentLoading();
          if (action.type !== deletePostSuccess.type) {
            this.postsFacade.navigateToBackPage();
          } else {
            this.postsFacade.loadPosts(
              postsPage?.pageIndex,
              postsPage?.pageIndex,
              postsPage?.sortBy,
              postsPage?.sortDirection
            );
          }
        })
      );
    },
    { dispatch: false }
  );

  private handleError(err: any): Observable<any> {
    this.sharedFacade.hideContentLoading();
    const errorMessage = this.postsService.getErrorMessage(err.error.message);
    return of(displayErrorMessage({ message: errorMessage }));
  }
}
