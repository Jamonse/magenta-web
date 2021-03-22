import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedFacade } from '../../state/shared.facade';

@Component({
  selector: 'app-general-loading',
  templateUrl: './general-loading.component.html',
  styleUrls: ['./general-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralLoadingComponent implements OnInit {
  displayLoading!: Observable<boolean>;
  constructor(private facade: SharedFacade) {}

  ngOnInit(): void {
    this.displayLoading = this.facade.getGeneralLoading();
  }
}
