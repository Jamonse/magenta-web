import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/auth/model/privilege.model';
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

  @Input() set hasPermission(requiredPermission: Privilege) {
    this.authFacade.getPermissions().subscribe((permissions) => {
      console.log(permissions);
      if (permissions) {
        const hasPermission = permissions.some(
          (permission) =>
            permission.name === requiredPermission.name &&
            this.resolvePermissionLevel(
              requiredPermission.level,
              permission.level
            )
        );
        if (hasPermission) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    });
  }

  private resolvePermissionLevel(
    requiredPermission: string,
    grantedPermission: string
  ): boolean {
    let requiredLevel = 0;
    let grantedLevel = -1;
    switch (requiredPermission) {
      case 'ADMIN':
        requiredLevel = 4;
        break;
      case 'WRITE':
        requiredLevel = 3;
        break;
      case 'MANAGE':
        requiredLevel = 2;
        break;
      case 'READ':
        requiredLevel = 1;
        break;
    }
    switch (grantedPermission) {
      case 'ADMIN':
        grantedLevel = 4;
        break;
      case 'WRITE':
        grantedLevel = 3;
        break;
      case 'MANAGE':
        grantedLevel = 2;
        break;
      case 'READ':
        grantedLevel = 1;
        break;
    }
    return grantedLevel >= requiredLevel;
  }

  ngOnDestroy(): void {
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }
  }
}
