import { SanitizingSafePipe } from './sanitizing-safe.pipe';

describe('SanitizingSafePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizingSafePipe();
    expect(pipe).toBeTruthy();
  });
});
