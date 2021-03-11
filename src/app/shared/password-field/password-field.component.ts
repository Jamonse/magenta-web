import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements OnInit {
  @Input() required = true;
  @Input() label: string = 'Password';
  password!: FormGroup;
  hide: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.password = new FormGroup({
      password: new FormControl('', [
        async () => (this.required ? Validators.required : null),
      ]),
    });
  }
}
