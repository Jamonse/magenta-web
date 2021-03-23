import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsResponse } from '../model/posts.response';
import { PostsFacade } from '../state/posts.facade';

@Component({
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
})
export class PostsContainerComponent implements OnInit {
  constructor(private postsFacade: PostsFacade) {}
  postsData!: Observable<PostsResponse | null>;
  ngOnInit(): void {
    this.postsFacade.loadPosts();
    this.postsData = this.postsFacade.getPostsPage();
  }
}
