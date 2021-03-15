import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/auth/model/theme.model';
import { AuthFacade } from 'src/app/auth/state/auth.facade';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  preferedTheme!: Observable<Theme>;
  theme = Theme;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private authFacade: AuthFacade,
    private media: MediaMatcher
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetector.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.preferedTheme = this.authFacade.getTheme();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  logout(): void {
    this.authFacade.performLogout();
  }
}
