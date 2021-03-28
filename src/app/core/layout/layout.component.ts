import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { Theme } from 'src/app/auth/model/theme.model';
import { User } from 'src/app/auth/model/user.model';
import { AuthFacade } from 'src/app/auth/state/auth.facade';
import { MobileQueryService } from 'src/app/shared/service/mobile-query.service';
import { BreakPointType } from 'src/app/shared/utils/breakpoint.type';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sideNav') sideNav!: MatSidenav;
  mobileSubscription!: Subscription;
  mobileQuery: Observable<boolean>;
  user!: Observable<User | null>;
  theme = Theme;

  constructor(
    private queryService: MobileQueryService,
    private authFacade: AuthFacade
  ) {
    this.mobileQuery = this.queryService.getMobileQuery(BreakPointType.MD);
  }

  ngOnInit(): void {
    this.user = this.authFacade.getUser();
  }

  ngOnDestroy(): void {
    if (this.mobileSubscription) {
      this.mobileSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authFacade.performLogout();
  }

  navOptionClicked(): void {
    this.mobileSubscription = this.mobileQuery.subscribe((isMobile) =>
      isMobile ? this.sideNav.close() : null
    );
  }
}
