import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { postInitialState } from '../state/post.state';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        AngularEditorModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState: postInitialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
