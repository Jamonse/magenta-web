import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { MaterialModule } from 'src/app/material/material.module';
import { GeneralDialogData } from '../model/general-dialog.data';
import { GenerealDialogDefinition } from '../model/general-dialog.definition';
import { GeneralDialogType } from '../model/general-dialog.type';

import { GeneralDialogComponent } from './general-dialog.component';

describe('GeneralDialogComponent', () => {
  let component: GeneralDialogComponent;
  let fixture: ComponentFixture<GeneralDialogComponent>;
  let store;

  beforeEach(async () => {
    const dialogData: GeneralDialogData = {
      dialogMessage: 'message',
      dialogType: GeneralDialogType.INFO,
      dialogDefinition: GenerealDialogDefinition.OK,
    };
    await TestBed.configureTestingModule({
      imports: [MaterialModule, MatDialogModule],
      declarations: [GeneralDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: fakeAppState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
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

  it('Should contain button with ok text - (INFO, OK) dialog', () => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let buttonText = buttons[0].nativeElement.innerText;
    expect(buttons.length === 1).toBeTruthy();
    expect(buttonText).toEqual('OK');
  });
});
