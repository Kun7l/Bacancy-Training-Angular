import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppLoading]',
})
export class AppLoading {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.innerHTML = 'Loading...';
    this.el.nativeElement.style.opacity = 0.5;
    this.el.nativeElement.disabled = true;

    setTimeout(() => {
      this.el.nativeElement.innerHTML = 'Add to cart';
      this.el.nativeElement.style.opacity = 1;
      this.el.nativeElement.disabled = false;
    }, 3000);
  }
}
