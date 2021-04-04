import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideMockStore({ initialState: fakeAppState })],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
