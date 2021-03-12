import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Password';
  value: string = '';
  hide: boolean = true;
  isDisabled: boolean = false;
  passwordControl: FormControl = new FormControl();

  onChange = (_: any) => {};

  onTouched = () => {};

  constructor() {}

  ngOnInit() {
    this.passwordControl.valueChanges.subscribe((value) =>
      this.onChange(value)
    );
  }

  writeValue(password: string = ''): void {
    this.value = password;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  emptyValue(): boolean {
    if (this.value) {
      return this.value === '';
    }
    return false;
  }
}
