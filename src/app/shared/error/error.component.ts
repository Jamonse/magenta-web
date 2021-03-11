import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { GeneralDialogType } from '../general-dialog/general-dialog.type';
import { SharedFacade } from '../state/shared.facade';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  errorMessage!: Observable<string>;
  constructor(private facade: SharedFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.errorMessage = this.facade.getErrorMessage();
    this.errorMessage.subscribe((message) => {
      // Listen to error messages
      if (message) {
        // Open error message dialog for non empty error messages
        this.openErrorDialog(message);
      }
    });
  }

  private openErrorDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      data: {
        dialogType: GeneralDialogType.ERROR,
        dialogMessage: errorMessage,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.facade.clearError());
  }
}
