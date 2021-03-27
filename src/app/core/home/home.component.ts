import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/shared/router/routing.service';
import { POST_WRITE } from '../../auth/util/permission.util';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  editPermission = POST_WRITE;
  constructor(private routingService: RoutingService) {}

  ngOnInit(): void {}

  editButtonPressed(event: any) {
    this.routingService.navigateToPostsEditPage();
  }
}
