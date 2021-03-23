import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsContainerComponent } from './posts-container/posts-container.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: PostsContainerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
