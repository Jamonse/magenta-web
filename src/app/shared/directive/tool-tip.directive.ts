import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appToolTip]',
})
export class ToolTipDirective {
  constructor(private matTooltip: MatTooltip, private elementRef: ElementRef) {}
  // Enables / disables tool tip on ellipsis / none-ellipsis text
  @HostListener('mouseenter')
  initTooltip() {
    const element = this.elementRef.nativeElement;
    this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
  }
}
