import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DomHelper<T> {
  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  count(tagName: string): number {
    return this.allElements(tagName).length;
  }

  singleElement(tagName: string): DebugElement {
    return this.fixture.debugElement.query(By.css(tagName));
  }

  allElements(tagName: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
}
