import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizingSafe',
})
export class SanitizingSafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(htmlContent: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(htmlContent);
  }
}
