import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { Permission } from 'src/app/auth/model/permission.model';
import { getPermissions } from 'src/app/auth/state/auth.selector';
import {
  USER_ADMIN,
  USER_MANAGE,
  USER_READ,
} from 'src/app/auth/util/permission.util';
import { HasPermissionDirective } from './has-permission.directive';
import { Privilege } from '../../auth/model/privilege.model';

@Component({
  template: `<div *hasPermission="requiredPermission">Rendered</div>`,
})
class UnderTest {
  requiredPermission!: Permission;
}

describe('HasPermissionDirective', () => {
  let store: any;
  let fixture: ComponentFixture<UnderTest>;
  let component: UnderTest;
  beforeEach(() => {
    const providedPrevillege: Privilege = {
      id: 1,
      name: USER_MANAGE.name,
      level: USER_MANAGE.level,
    };
    TestBed.configureTestingModule({
      declarations: [UnderTest, HasPermissionDirective],
      providers: [
        provideMockStore({
          initialState: fakeAppState,
          selectors: [
            { selector: getPermissions, value: [providedPrevillege] },
          ],
        }),
      ],
    });
    fixture = TestBed.createComponent(UnderTest);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Should render with valid permission', () => {
    component.requiredPermission = USER_MANAGE;
    fixture.detectChanges();
    ensureRender(fixture);
  });
  it('Should render with permission above valid', () => {
    component.requiredPermission = USER_READ;
    fixture.detectChanges();
    ensureRender(fixture);
  });
  it('Should not render when required permission above granted privilege', () => {
    component.requiredPermission = USER_ADMIN;
    fixture.detectChanges();
    ensureRender(fixture, false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});

function ensureRender(
  fixture: ComponentFixture<UnderTest>,
  rendered: boolean = true
) {
  let divs = fixture.debugElement.queryAll(By.css('div'));
  let divText = rendered ? divs[0].nativeElement.innerText : undefined;
  rendered
    ? expect(divs.length === 1).toBeTruthy()
    : expect(divs.length === 0).toBeTruthy();
  rendered ? expect(divText === 'Rendered').toBeTruthy() : undefined;
}
