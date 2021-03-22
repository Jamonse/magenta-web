import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { PostsService } from '../service/posts.service';
import { loadPosts, loadPostsSuccess } from './post.action';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostsService,
    private sharedFacade: SharedFacade
  ) {}

  loadPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        this.sharedFacade.displayLoading();
        return this.postsService
          .getPostsPage(
            action.pageIndex,
            action.pageSize,
            action.sortBy,
            action.asc
          )
          .pipe(
            map((postsResponse) => loadPostsSuccess({ posts: postsResponse }))
          );
      })
    )
  );
}
