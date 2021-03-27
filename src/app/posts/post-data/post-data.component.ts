import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { PostsFacade } from '../state/posts.facade';

@Component({
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss'],
})
export class PostDataComponent implements OnInit {
  post!: Observable<Post | null>;
  constructor(private postsFacade: PostsFacade) {}

  ngOnInit(): void {
    this.post = this.postsFacade.getPostById();
  }
}
