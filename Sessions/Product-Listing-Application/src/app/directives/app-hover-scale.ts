import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appAppHoverScale]',
})
export class AppHoverScale {
  constructor(private el: ElementRef) {}
  
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.scale = 1.03;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.scale = 1;
  }
}
