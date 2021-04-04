import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [CommonModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState: fakeAppState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
