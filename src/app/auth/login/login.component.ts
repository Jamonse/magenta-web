import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { AuthFacade } from '../state/auth.facade';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.sharedFacade.displayLoading();
      this.authFacade.performLogin(email, password);
    }
  }
}
