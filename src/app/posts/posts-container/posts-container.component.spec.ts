import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { PostsReducer } from '../state/posts.reducer';

import { PostsContainerComponent } from './posts-container.component';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsContainerComponent],
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
    fixture = TestBed.createComponent(PostsContainerComponent);
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
