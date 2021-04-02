import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/posts/model/post.model';

@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.scss'],
})
export class NewsfeedPostComponent implements OnInit {
  @Input() post!: Post;

  constructor() {}

  ngOnInit(): void {}
}
