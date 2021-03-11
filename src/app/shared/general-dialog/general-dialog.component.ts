import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralDialogData } from './general-dialog.data';
import { GeneralDialogType } from './general-dialog.type';

@Component({
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss'],
})
export class GeneralDialogComponent implements OnInit {
  dialogData: GeneralDialogData;
  dialogIcon: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: GeneralDialogData) {
    this.dialogData = data;
    this.dialogIcon = this.dialogData.dialogType;
  }

  ngOnInit(): void {}
}
