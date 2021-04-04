import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { PostsRoutingService } from './posts-routing.service';

describe('PostsRoutingService', () => {
  let service: PostsRoutingService;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState: fakeAppState })],
    });
    service = TestBed.inject(PostsRoutingService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
