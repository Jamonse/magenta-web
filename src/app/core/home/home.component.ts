import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/posts/model/post.model';
import { RoutingService } from 'src/app/shared/router/routing.service';
import { POST_WRITE } from '../../auth/util/permission.util';
import { NewsfeedService } from '../newsfeed/service/newsfeed.service';
import { NewsfeedFacade } from '../newsfeed/state/newsfeed.facade';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  editPermission = POST_WRITE;
  postsBatch!: Observable<Post[]>;
  constructor(
    private routingService: RoutingService,
    private newsFeedFacade: NewsfeedFacade
  ) {}

  ngOnInit(): void {
    this.postsBatch = this.newsFeedFacade.getNewsFeed();
    this.newsFeedFacade.openConnection();
  }

  editButtonPressed(event: any) {
    this.routingService.navigateToPostsEditPage();
  }
}
