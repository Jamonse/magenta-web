import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { DomHelper } from 'src/app/test/dom-helper';

describe('RemoveFocusDirective', () => {
  let fixture: ComponentFixture<UnderTest>;
  let helper: DomHelper<UnderTest>;
  let store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UnderTest);
    helper = new DomHelper(fixture);
  });
  it('should remove focus after button click', () => {
    let button = helper.singleElement('button');
    button.click();
    fixture.detectChanges();
    let focusedButton = helper.allElements('button:focus');
    expect(focusedButton.length).toBeFalsy();
  });
});

@Component({ template: '<button>Button</button>' })
export class UnderTest {}
