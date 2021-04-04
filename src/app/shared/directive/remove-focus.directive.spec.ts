import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { RemoveFocusDirective } from './remove-focus.directive';

describe('RemoveFocusDirective', () => {
  beforeEach(async () => {
    let store;
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });
  it('should create an instance', () => {});
});
