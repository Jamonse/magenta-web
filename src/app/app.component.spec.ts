import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { SHARED_STATE_NAME } from './shared/state/shared.selector';
import { sharedInitialState } from './shared/state/shared.state';
import { authInitialState } from './auth/state/auth.state';
import { NEWSFEED_STATE_NAME } from './core/newsfeed/state/newsfeed.selector';
import { newsfeedInitialState } from './core/newsfeed/state/newsfeed.state';
import { POSTS_STATE_NAME } from './posts/state/posts.selector';
import { postInitialState } from './posts/state/post.state';
import { refreshLogin } from './auth/state/auth.actions';

export const fakeAppState = {
  [SHARED_STATE_NAME]: sharedInitialState,
  [AUTH_STATE_NAME]: authInitialState,
  [NEWSFEED_STATE_NAME]: newsfeedInitialState,
  [POSTS_STATE_NAME]: postInitialState,
};

describe('AppComponent', () => {
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'magenta'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('magenta');
  });

  it(`should dispatch login refresh action on init`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    let spy = spyOn(store, 'dispatch');
    fixture.detectChanges(); // Calls ngOnInit
    expect(spy).toHaveBeenCalledOnceWith(refreshLogin());
  });
});
