import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetector.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
