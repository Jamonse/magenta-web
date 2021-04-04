import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NewsfeedService } from './newsfeed.service';

describe('NewsfeedService', () => {
  let service: NewsfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(NewsfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
