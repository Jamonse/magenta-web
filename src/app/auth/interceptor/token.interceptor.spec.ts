import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from '../state/auth.reducer';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
      imports: [StoreModule.forRoot(AuthReducer), EffectsModule.forRoot([])],
    })
  );

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
