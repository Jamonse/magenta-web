import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { DomHelper } from 'src/app/test/dom-helper';
import { ToolTipDirective } from './tool-tip.directive';

describe('ToolTipDirective', () => {
  let fixture: ComponentFixture<UnderTest>;
  let helper: DomHelper<UnderTest>;
  beforeEach(async () => {
    let store;
    await TestBed.configureTestingModule({
      imports: [MatTooltipModule],
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });
});

@Component({
  template:
    '<div appToolTip [matTooltip]="Truncated text" style="width: 1px">Truncated text</div>',
})
export class UnderTest {}
