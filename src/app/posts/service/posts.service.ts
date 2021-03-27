import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ASC,
  INITIAL_ASC,
  PAGE_INDEX,
  PAGE_SIZE,
  SORT_BY,
} from 'src/app/shared/utils/pagination.util';
import { Post } from '../model/post.model';
import { PostsResponse } from '../model/posts.response';
import { POSTS_GET_URL } from '../util/posts-url.util';
import { PostSortType, POST_INITIAL_SORT_TYPE } from '../util/posts.util';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPostsPage(
    pageIndex: number,
    pageSize: number,
    sortBy: PostSortType = POST_INITIAL_SORT_TYPE,
    asc: boolean = INITIAL_ASC
  ): Observable<PostsResponse> {
    const queryParams: HttpParams = new HttpParams();
    queryParams.set(PAGE_INDEX, `${pageIndex}`);
    queryParams.set(PAGE_SIZE, `${pageSize}`);
    queryParams.set(SORT_BY, sortBy);
    queryParams.set(ASC, `${asc}`);

    return this.http.get<PostsResponse>(POSTS_GET_URL, { params: queryParams });
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${POSTS_GET_URL}/${postId}`);
  }
}
