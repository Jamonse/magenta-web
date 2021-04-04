import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { HasPermissionDirective } from './has-permission.directive';

describe('HasPermissionDirective', () => {
  beforeEach(async () => {
    let store;
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });
  it('should create an instance', () => {});
});
