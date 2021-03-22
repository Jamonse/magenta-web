import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostsContainerComponent, PostComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
