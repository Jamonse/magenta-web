import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Permission } from 'src/app/auth/model/permission.model';
import { NONE } from 'src/app/auth/util/permission.util';
import { AuthFacade } from '../../auth/state/auth.facade';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective implements OnDestroy {
  permissionSubscription!: Subscription;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authFacade: AuthFacade
  ) {}

  @Input() set hasPermission(requiredPermission: Permission) {
    if (requiredPermission === NONE) {
      // Permission required is NONE (no permission)
      this.displayContent();
      return;
    } // Get user permissions from state
    this.permissionSubscription = this.authFacade
      .getPermissions()
      .subscribe((privileges) => {
        if (privileges) {
          // Check if required given permission matching retreived permissions
          const hasPermission = privileges.some(
            (privilege) =>
              privilege.name === requiredPermission.name &&
              Permission.resolvePrivilege(privilege, requiredPermission)
          ); // Display content if it does, otherwise hide content
          if (hasPermission) {
            this.displayContent();
          } else {
            this.viewContainer.clear();
          }
        }
      });
  }

  private displayContent(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  ngOnDestroy(): void {
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }
  }
}
