import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POSTS_STATE_NAME } from './state/posts.selector';
import { PostsReducer } from './state/posts.reducer';
import { PostsEffect } from './state/posts.effect';
import { PostDataComponent } from './post-data/post-data.component';
import { PostFormComponent } from './post-form/post-form.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    PostsContainerComponent,
    PostComponent,
    PostDataComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    AngularEditorModule,
    EffectsModule.forFeature([PostsEffect]),
    StoreModule.forFeature(POSTS_STATE_NAME, PostsReducer),
  ],
})
export class PostsModule {}
