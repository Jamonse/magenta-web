import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { PostDataComponent } from './post-data.component';

describe('PostDataComponent', () => {
  let component: PostDataComponent;
  let fixture: ComponentFixture<PostDataComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDataComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
