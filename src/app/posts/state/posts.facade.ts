import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GenerealDialogDefinition } from 'src/app/shared/dialog/model/general-dialog.definition';
import { GeneralDialogType } from 'src/app/shared/dialog/model/general-dialog.type';
import { MatDialogData } from 'src/app/shared/dialog/model/mat-dialog.data';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';
import {
  INITIAL_ASC,
  INITIAL_PAGE_INDEX,
  INITIAL_PAGE_SIZE,
} from 'src/app/shared/utils/pagination.util';
import { Post } from '../model/post.model';
import { PostSearchResult } from '../model/post.search-result';
import { PostsResponse } from '../model/posts.response';
import { PostsRoutingService } from '../service/posts-routing.service';
import { PostSortType, POST_INITIAL_SORT_TYPE } from '../util/posts.util';
import {
  createPost,
  deletePost,
  loadPosts,
  searchPosts,
  updatePost,
} from './post.action';
import { PostState } from './post.state';
import { getPostById, getPostsPage, getSearchedPosts } from './posts.selector';

@Injectable({ providedIn: 'root' })
export class PostsFacade implements OnDestroy {
  dialogSubscription!: Subscription;
  constructor(
    private store: Store<PostState>,
    private dialogService: DialogService,
    private postsRoutingService: PostsRoutingService
  ) {}

  loadPosts(
    pageIndex: number = INITIAL_PAGE_INDEX,
    pageSize: number = INITIAL_PAGE_SIZE,
    sortBy: PostSortType = POST_INITIAL_SORT_TYPE,
    asc: boolean = INITIAL_ASC
  ): void {
    this.store.dispatch(
      loadPosts({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        asc: asc,
      })
    );
  }

  getPostsPage(): Observable<PostsResponse | null> {
    return this.store.select(getPostsPage);
  }

  getPostById(): Observable<Post | null> {
    return this.store.select(getPostById);
  }

  performSearch(text: string): void {
    this.store.dispatch(searchPosts({ text: text }));
  }

  getSearchedPosts(): Observable<PostSearchResult[]> {
    return this.store.select(getSearchedPosts);
  }

  isFormUpdateMode(): boolean {
    return this.postsRoutingService.isUpdateForm();
  }

  navigateToBackPage(): void {
    this.postsRoutingService.backPage();
  }

  nvaigateToPostsPage(): void {
    this.postsRoutingService.navigateToPostsPage();
  }

  createPost(post: Post): void {
    this.store.dispatch(createPost({ post: post }));
  }

  updatePost(post: Post): void {
    this.store.dispatch(updatePost({ post: post }));
  }

  deletePost(postId: number): void {
    const dialogData: MatDialogData = {
      data: {
        dialogType: GeneralDialogType.WARNING,
        dialogDefinition: GenerealDialogDefinition.CONFIRMATION,
        dialogMessage: 'Are you sure?',
      },
      panelClass: 'dialog',
    };
    this.dialogSubscription = this.dialogService
      .openDialog(dialogData)
      .subscribe((value) => {
        if (value) {
          this.store.dispatch(deletePost({ postId: postId }));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
