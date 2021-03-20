import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Permission } from 'src/app/auth/model/permission.model';
import { Privilege } from 'src/app/auth/model/privilege.model';
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
      this.displayContent();
      return;
    }
    this.authFacade.getPermissions().subscribe((privileges) => {
      if (privileges) {
        const hasPermission = privileges.some(
          (privilege) =>
            privilege.name === requiredPermission.name &&
            Permission.resolvePrivilege(privilege, requiredPermission)
        );
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
