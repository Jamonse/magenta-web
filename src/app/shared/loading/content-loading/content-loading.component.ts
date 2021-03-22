import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedFacade } from '../../state/shared.facade';

@Component({
  selector: 'app-content-loading',
  templateUrl: './content-loading.component.html',
  styleUrls: ['./content-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLoadingComponent implements OnInit {
  displayLoading!: Observable<boolean>;
  constructor(private facade: SharedFacade) {}

  ngOnInit(): void {
    this.displayLoading = this.facade.getContentLoading();
  }
}
