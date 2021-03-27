import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const LOGIN_PAGE = 'auth';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) {}

  navigateToLoginPage(): void {
    this.router.navigate([LOGIN_PAGE]);
  }

  navigateToHomePage(): void {
    this.router.navigate(['']);
  }

  navigateToPostsEditPage(): void {
    this.router.navigate(['posts']);
  }
}
