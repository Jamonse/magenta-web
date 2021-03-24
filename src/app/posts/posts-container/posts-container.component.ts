import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/shared/events/sort.event';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { PostsResponse } from '../model/posts.response';
import { PostsFacade } from '../state/posts.facade';
import { PostSortInterface } from '../util/post-sort.map';
import { PostSortType, POST_SORT_TYPES } from '../util/posts.util';

@Component({
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
})
export class PostsContainerComponent implements OnInit {
  constructor(private postsFacade: PostsFacade) {}
  postsData!: Observable<PostsResponse | null>;
  pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
  sortOptions: PostSortInterface[] = POST_SORT_TYPES;
  pageIndex: number = INITIAL_PAGE_INDEX;
  pageSize: number = INITIAL_PAGE_SIZE;
  sortOption!: PostSortType;
  sortDirection!: boolean;

  ngOnInit(): void {
    this.postsFacade.loadPosts();
    this.postsData = this.postsFacade.getPostsPage();
  }

  pageEvent(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.postsFacade.loadPosts(this.pageIndex, this.pageSize);
  }

  sortEvent(sortEvent: SortEvent): void {
    this.sortOption = <PostSortType>sortEvent.sortOption;
    this.sortDirection = sortEvent.sortDirection;
    this.postsFacade.loadPosts(
      this.pageIndex,
      this.pageSize,
      this.sortOption,
      this.sortDirection
    );
  }
}
