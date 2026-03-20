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
  private initialWidth: number = 0;
  private initialHeight: number = 0;

  
  @HostBinding('style.width.px') widthPx: number | null = null;
  @HostBinding('style.height.px') heightPx: number | null = null;

  ngOnInit(): void {
    this.initialWidth = this.el.nativeElement.offsetWidth;
    this.initialHeight = this.el.nativeElement.offsetHeight;
    this.heightPx = this.initialHeight;
    this.widthPx = this.initialWidth;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.widthPx = 200; 
    this.heightPx = 150;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.widthPx = this.initialWidth;
    this.heightPx = this.initialHeight;
  }
}
