import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { AuthReducer } from '../state/auth.reducer';

import { TokenInterceptor } from './token.interceptor';
import { Observable } from 'rxjs';

describe('TokenInterceptor', () => {
  let store: MockStore;
  let actions$ = new Observable<Action>();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        provideMockStore({ initialState: fakeAppState }),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
