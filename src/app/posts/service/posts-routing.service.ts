import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/shared/router/routing.service';

@Injectable({
  providedIn: 'root',
})
export class PostsRoutingService {
  constructor(private router: Router, private routingService: RoutingService) {}
  nvaigateToPostEditPage(postId: number): void {
    this.router.navigate([`posts/edit/${postId}`]);
  }

  navigateToPostReadPage(postId: number): void {
    this.router.navigate([`posts/details/${postId}`]);
  }

  navigateToPostCreatePage(): void {
    this.router.navigate(['posts/create']);
  }

  isUpdateForm(): boolean {
    return this.router.url.indexOf('edit') !== -1;
  }

  backPage(): void {
    this.routingService.backPage();
  }
}
