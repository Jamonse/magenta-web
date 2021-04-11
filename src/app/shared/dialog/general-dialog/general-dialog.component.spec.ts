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
    await TestBed.configureTestingModule({
      imports: [MaterialModule, MatDialogModule],
      declarations: [GeneralDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
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

  it('Should contain only OK button when dialog defenition is ok', () => {
    const dialogData: GeneralDialogData = {
      dialogMessage: 'message',
      dialogType: GeneralDialogType.INFO,
      dialogDefinition: GenerealDialogDefinition.OK,
    };
    component.dialogData = dialogData;
    fixture.detectChanges();
    let buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(buttons.length === 1).toBeTruthy();
    expect(buttons[0].nativeElement.innerText).toBe('OK');
  });

  it('Should Should contain only Yes and No buttons when dialog defenition is confirmation', () => {
    const dialogData: GeneralDialogData = {
      dialogMessage: 'message',
      dialogType: GeneralDialogType.INFO,
      dialogDefinition: GenerealDialogDefinition.CONFIRMATION,
    };
    component.dialogData = dialogData;
    fixture.detectChanges();
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let buttonTexts = buttons.map((button) => button.nativeElement.innerText);
    let buttonsContainYesText = buttonTexts.reduce(
      (count, value) => count + (value === 'Yes'),
      0
    );
    let buttonsContainNoText = buttonTexts.reduce(
      (count, value) => count + (value === 'No'),
      0
    );

    expect(buttons.length === 2).toBeTruthy();
    expect(buttonsContainYesText === 1).toBeTruthy();
    expect(buttonsContainNoText === 1).toBeTruthy();
  });
  it('Should contain only one div that displays dialog message', () => {
    const dialogData: GeneralDialogData = {
      dialogMessage: 'message',
      dialogType: GeneralDialogType.INFO,
      dialogDefinition: GenerealDialogDefinition.CONFIRMATION,
    };
    component.dialogData = dialogData;
    fixture.detectChanges();
    let divs = fixture.debugElement.queryAll(By.css('div'));
    let divsThatContainsDialogMessage = divs.filter(
      (div) => div.nativeElement.innerText === dialogData.dialogMessage
    );

    expect(divsThatContainsDialogMessage.length === 1).toBeTruthy();
    expect(
      divsThatContainsDialogMessage[0].nativeElement.innerText ===
        dialogData.dialogMessage
    );
  });
});
