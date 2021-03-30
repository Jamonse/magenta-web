import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/shared/dialog/service/events/sort.event';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { PostSearchResult } from '../model/post.search-result';
import { PostsResponse } from '../model/posts.response';
import { PostsRoutingService } from '../service/posts-routing.service';
import { PostsFacade } from '../state/posts.facade';
import { PostSortInterface } from '../util/post-sort.map';
import { PostSortType, POST_SORT_TYPES } from '../util/posts.util';

@Component({
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
})
export class PostsContainerComponent implements OnInit {
  columns: number = 5;
  constructor(
    private postsFacade: PostsFacade,
    private postsRoutingService: PostsRoutingService
  ) {}
  postsData!: Observable<PostsResponse | null>;
  searchedPosts!: Observable<PostSearchResult[]>;
  pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
  sortOptions: PostSortInterface[] = POST_SORT_TYPES;
  pageIndex: number = INITIAL_PAGE_INDEX;
  pageSize: number = INITIAL_PAGE_SIZE;
  sortOption!: PostSortType;
  sortDirection!: boolean;

  ngOnInit(): void {
    this.postsFacade.loadPosts();
    this.postsData = this.postsFacade.getPostsPage();
    this.searchedPosts = this.postsFacade.getSearchedPosts();
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

  createEventClicked(): void {
    this.postsRoutingService.navigateToPostCreatePage();
  }

  editEventClicked(postId: number): void {
    this.postsRoutingService.nvaigateToPostEditPage(postId);
  }

  readEventClicked(postId: number): void {
    this.postsRoutingService.navigateToPostReadPage(postId);
  }

  deleteEventClicked(postId: number): void {
    this.postsFacade.deletePost(postId);
  }

  searchTextChanged(text: string): void {
    this.postsFacade.performSearch(text);
  }
}
