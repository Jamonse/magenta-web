import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PasswordFieldComponent,
    LoadingComponent,
    ErrorComponent,
    GeneralDialogComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordFieldComponent,
    LoadingComponent,
    ErrorComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
