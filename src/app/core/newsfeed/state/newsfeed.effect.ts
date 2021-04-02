import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthFacade } from 'src/app/auth/state/auth.facade';
import { NewsfeedService } from '../service/newsfeed.service';
import {
  loadPostsBatch,
  loadPostsBatchSuccess,
  openConnection,
} from './newsfeed.action';

@Injectable()
export class NewsfeedEffect {
  constructor(
    private actions$: Actions,
    private newsfeedService: NewsfeedService,
    private authFacade: AuthFacade
  ) {}

  loadNewsfeedBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsBatch),
      exhaustMap((action) => {
        return this.newsfeedService.getPostsBatch(action.pageIndex).pipe(
          map((posts) => loadPostsBatchSuccess({ postsBatch: posts })),
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        );
      })
    )
  );

  listenToNewsfeedSse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openConnection),
        withLatestFrom(this.authFacade.getUser()),
        tap(([action, user]) => {
          if (user) {
            const eventSource: EventSource = this.newsfeedService.getNewsfeedSource(
              user.id
            );
            eventSource.onmessage = (event) => {
              console.log(event.data);
            };
          }
        })
      ),
    { dispatch: false }
  );
}
