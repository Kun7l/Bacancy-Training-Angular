import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppHighlightDiscount]',

})
export class AppHighlightDiscount implements OnInit{
  @Input('appAppHighlightDiscount') backgroundColor : string = 'transperent';
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
     this.el.nativeElement.style.backgroundColor = this.backgroundColor;
  }
}
