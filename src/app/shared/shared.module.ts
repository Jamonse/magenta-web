import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { ErrorComponent } from './error/error.component';
import { GeneralDialogComponent } from './dialog/general-dialog/general-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HasPermissionDirective } from './directive/has-permission.directive';
import { GeneralLoadingComponent } from './loading/general-loading/general-loading.component';
import { ContentLoadingComponent } from './loading/content-loading/content-loading.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { ToolTipDirective } from './directive/tool-tip.directive';
import { SanitizingSafePipe } from './pipe/sanitizing-safe.pipe';

@NgModule({
  declarations: [
    PasswordFieldComponent,
    ErrorComponent,
    GeneralDialogComponent,
    PageNotFoundComponent,
    HasPermissionDirective,
    GeneralLoadingComponent,
    ContentLoadingComponent,
    SearchContainerComponent,
    ToolTipDirective,
    SanitizingSafePipe,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordFieldComponent,
    ErrorComponent,
    PageNotFoundComponent,
    HasPermissionDirective,
    GeneralLoadingComponent,
    ContentLoadingComponent,
    SearchContainerComponent,
    ToolTipDirective,
    SanitizingSafePipe,
  ],
})
export class SharedModule {}
