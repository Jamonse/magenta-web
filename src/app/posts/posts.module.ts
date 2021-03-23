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

@NgModule({
  declarations: [PostsContainerComponent, PostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([PostsEffect]),
    StoreModule.forFeature(POSTS_STATE_NAME, PostsReducer),
  ],
})
export class PostsModule {}
