import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [provideMockStore({ initialState: fakeAppState })],
    });
    service = TestBed.inject(DialogService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
