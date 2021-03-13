import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { GeneralDialogType } from '../general-dialog/general-dialog.type';
import { SharedFacade } from '../state/shared.facade';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage!: Observable<string>;
  subscriptions: Subscription[] = [];
  constructor(private facade: SharedFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.errorMessage = this.facade.getErrorMessage();
    this.insertSubscription(
      this.errorMessage.subscribe((message) => {
        // Listen to error messages
        if (message) {
          // Open error message dialog for non empty error messages
          this.openErrorDialog(message);
        }
      })
    );
  }

  private openErrorDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      data: {
        dialogType: GeneralDialogType.ERROR,
        dialogMessage: errorMessage,
      },
      panelClass: 'dialog',
    });
    const dialogSubscription = dialogRef
      .afterClosed()
      .subscribe(() => this.facade.clearError());
    this.insertSubscription(dialogSubscription);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.subscriptions = [];
    }
  }

  insertSubscription(subscriptionToInsert: Subscription): void {
    this.subscriptions.push(subscriptionToInsert);
  }
}
