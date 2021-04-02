import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewsfeedService } from '../service/newsfeed.service';
import { openConnection } from './newsfeed.action';
import { getNewsfeed } from './newsfeed.selector';
import { NewsfeedState } from './newsfeed.state';

@Injectable({ providedIn: 'root' })
export class NewsfeedFacade {
  constructor(private store: Store<NewsfeedState>) {}

  getNewsFeed() {
    return this.store.select(getNewsfeed);
  }

  openConnection() {
    this.store.dispatch(openConnection());
  }
}
