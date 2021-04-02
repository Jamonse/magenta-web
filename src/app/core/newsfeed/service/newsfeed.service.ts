import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostsResponse } from 'src/app/posts/model/posts.response';
import { NEWSFEED_URL, POSTS_GET_URL } from 'src/app/posts/util/posts-url.util';
import { PAGE_INDEX, SORT_BY } from 'src/app/shared/utils/pagination.util';

@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  constructor(private http: HttpClient) {}

  getPostsBatch(pageIndex: number) {
    const queryParams = new HttpParams()
      .set(PAGE_INDEX, `${pageIndex}`)
      .set(SORT_BY, 'createdAt');
    return this.http
      .get<PostsResponse>(POSTS_GET_URL, { params: queryParams })
      .pipe(map((postsPage) => postsPage.content));
  }

  getNewsfeedSource(userId: number): EventSource {
    return new EventSource(`${NEWSFEED_URL}${userId}`);
  }
}
