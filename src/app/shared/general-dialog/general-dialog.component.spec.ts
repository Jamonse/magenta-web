import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';

import { GeneralDialogComponent } from './general-dialog.component';

describe('GeneralDialogComponent', () => {
  let component: GeneralDialogComponent;
  let fixture: ComponentFixture<GeneralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, MatDialogModule],
      declarations: [GeneralDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should contain icon', () => {
    let icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
  });

  it('Should contain button with ok text', () => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let buttonText = buttons[0].nativeElement.innerText;
    expect(buttons.length === 1).toBeTruthy();
    expect(buttonText).toEqual('OK');
  });
});
