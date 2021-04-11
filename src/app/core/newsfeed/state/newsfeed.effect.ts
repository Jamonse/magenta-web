import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventSourcePolyfill, OnMessageEvent } from 'ng-event-source';
import { of, throwError } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthFacade } from 'src/app/auth/state/auth.facade';
import { NewsfeedEventType } from '../model/newsfeed-event.type';
import { NewsfeedService } from '../service/newsfeed.service';
import {
  loadPostsBatch,
  loadPostsBatchSuccess,
  openConnection,
  postArrived,
  postDeleted,
  postUpdated,
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
        withLatestFrom(this.authFacade.getEventSourceInfo()),
        tap(([action, info]) => {
          if (info) {
            const eventSource: EventSourcePolyfill = this.newsfeedService.getNewsfeedSource(
              info.jwt,
              info.userId
            );
            eventSource.onmessage = (event: OnMessageEvent) => {
              const newsfeedEvent = JSON.parse(event.data);
              switch (newsfeedEvent.eventType) {
                case NewsfeedEventType.CREATE:
                  return of(postArrived({ post: newsfeedEvent.payload }));
                case NewsfeedEventType.UPDATE:
                  return of(postUpdated({ post: newsfeedEvent.payload }));
                case NewsfeedEventType.DELETE:
                  return of(postDeleted({ postId: newsfeedEvent.payload.id }));
                default:
                  return of();
              }
            };
          }
        })
      ),
    { dispatch: false }
  );
}
