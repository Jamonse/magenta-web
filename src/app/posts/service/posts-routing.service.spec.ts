import { TestBed } from '@angular/core/testing';

import { PostsRoutingService } from './posts-routing.service';

describe('PostsRoutingService', () => {
  let service: PostsRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
