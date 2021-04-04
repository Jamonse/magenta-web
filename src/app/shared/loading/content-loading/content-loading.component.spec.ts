import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { ContentLoadingComponent } from './content-loading.component';

describe('ContentLoadingComponent', () => {
  let component: ContentLoadingComponent;
  let fixture: ComponentFixture<ContentLoadingComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentLoadingComponent],
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
    fixture = TestBed.createComponent(ContentLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
