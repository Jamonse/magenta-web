import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDataComponent } from './post-data/post-data.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PostsContainerComponent },
      { path: ':id', component: PostDataComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
