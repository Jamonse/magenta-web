import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDataComponent } from './post-data/post-data.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PostsContainerComponent },
      { path: 'create', component: PostFormComponent },
      { path: 'details/:id', component: PostDataComponent },
      { path: 'edit/:id', component: PostFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
