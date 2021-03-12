import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  OnDestroy,
  HostBinding,
  ElementRef,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: PasswordFieldComponent },
  ],
})
export class PasswordFieldComponent
  implements OnDestroy, MatFormFieldControl<string>, ControlValueAccessor {
  // Form group that binds to the input field value
  passowrdForm!: FormGroup;
  // Subject that holds the state changes stream
  stateChanges = new Subject<void>();
  // Id attribute for other components association
  static nextId = 0;
  // Id generated accoring to host element id
  @HostBinding() id = `app-password-field-${PasswordFieldComponent.nextId++}`;
  // Field placeholder
  private _placeholder: string = '';
  // Field is required
  private _required: boolean = true;
  // Is field disabled
  private _disabled: boolean = false;
  // Focus status
  private _label: string = 'Password';
  focused: boolean = false;
  hide: boolean = true;
  shouldLabelFloat: boolean = true;
  errorState: boolean = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  onChange = (_: any) => {};
  onTouched = () => {};

  @Input() get value(): string | null {
    if (this.passowrdForm.valid) {
      const {
        value: { password },
      } = this.passowrdForm;
      return password;
    }
    return null;
  }

  set value(password: string | null) {
    this.passowrdForm.setValue({ password });
    this.stateChange();
  }

  @Input() get password(): string {
    return this.passowrdForm.value;
  }

  set password(passwordToSet: string) {
    this.passowrdForm.setValue({ password: passwordToSet });
    this.stateChange();
  }

  @Input() get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(text: string) {
    this._placeholder = text;
    this.stateChange();
  }

  get empty(): boolean {
    let password = this.passowrdForm.value;
    return !password;
  }

  @Input() get required(): boolean {
    return this._required;
  }

  set required(isRequired: boolean) {
    this._required = isRequired;
    this.stateChange();
  }

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    this.stateChange();
  }

  @Input() get label(): string {
    return this._label;
  }

  set label(text: string) {
    this._label = text;
    this.stateChange();
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.passowrdForm = formBuilder.group({ password: '' });
    if (this.required) {
      this.passowrdForm.controls['password'].setValidators(Validators.required);
    }
    // Monitors the forcus of the input field using CDK focus monitor on the native HTML element
    this._focusMonitor.monitor(_elementRef, true).subscribe((monitored) => {
      this.focused = !!monitored;
      this.stateChange();
    });
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }
  writeValue(text: string): void {
    this.value = text;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {}

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private stateChange(value?: void) {
    this.stateChanges.next(value);
  }
}
