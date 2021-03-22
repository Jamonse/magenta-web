import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Injectable,
  OnDestroy,
  Optional,
} from '@angular/core';
import { BreakPoint, MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BreakPointType } from '../utils/breakpoint.type';

@Injectable({
  providedIn: 'root',
})
export class MobileQueryService {
  private _mediaMatcher: Observable<any>;
  constructor(public mediaObserver: MediaObserver) {
    this._mediaMatcher = mediaObserver.asObservable();
  }

  getMobileQuery(
    maxBreakPoint: BreakPointType,
    minBreakPoint?: BreakPointType
  ): Observable<boolean> {
    return this._mediaMatcher.pipe(
      filter((mediaChange) => mediaChange.length > 0),
      map((mediaChange) => {
        const currentBreakPoint: BreakPointType =
          BreakPointType[
            mediaChange[0].mqAlias.toUpperCase() as keyof typeof BreakPointType
          ];
        if (minBreakPoint) {
          return (
            currentBreakPoint >= minBreakPoint &&
            currentBreakPoint < maxBreakPoint
          );
        }
        return currentBreakPoint < maxBreakPoint;
      })
    );
  }
}
