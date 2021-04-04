import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fakeAppState } from 'src/app/app.component.spec';
import { SanitizingSafePipe } from './sanitizing-safe.pipe';

describe('SanitizingSafePipe', () => {
  let domSanitizer: DomSanitizer;
  beforeEach(async () => {
    let store;
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: fakeAppState }),
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: () => 'safeString',
          },
        },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    domSanitizer = TestBed.inject(DomSanitizer);
  });
  it('create an instance', () => {
    const pipe = new SanitizingSafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
