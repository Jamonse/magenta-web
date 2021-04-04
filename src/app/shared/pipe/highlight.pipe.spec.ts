import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  beforeEach(async () => {
    let store;
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });
  it('create an instance', () => {
    const pipe = new HighlightPipe();
    expect(pipe).toBeTruthy();
  });
});
