import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { GeneralLoadingComponent } from './general-loading.component';

describe('GeneralLoadingComponent', () => {
  let component: GeneralLoadingComponent;
  let fixture: ComponentFixture<GeneralLoadingComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralLoadingComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
      ],
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    fixture.destroy();
  });
});
