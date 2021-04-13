import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { SharedModule } from 'src/app/shared/shared.module';
import { DomHelper } from 'src/app/test/dom-helper';
import { AuthFacade } from '../state/auth.facade';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let helper: DomHelper<LoginComponent>;
  let store: MockStore;
  let facade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [AuthFacade, provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    helper = new DomHelper(fixture);
    facade = TestBed.inject(AuthFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on form submition button click', () => {
    let button = helper.singleElement('button');
    let spy = spyOn(component, 'login');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('form should not be valid when empty', () => {
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login method with form information on submition', () => {
    fixture.detectChanges();
    const email = 'email@email.com';
    const password = 'password';
    const emailField = component.loginForm.controls['email'];
    const passwordField = component.loginForm.controls['password'];
    let spy = spyOn(facade, 'performLogin');

    emailField.patchValue(email);
    passwordField.patchValue(password);

    component.login();

    expect(component.loginForm.valid).toBeTrue();
    expect(spy).toHaveBeenCalledOnceWith(email, password);
  });
});
