import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppStatusBorder]',
})
export class AppStatusBorder implements OnInit {
  @Input('appAppStatusBorder') borderColor: string = 'transperent';
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    this.el.nativeElement.style.border = '3px solid ' + this.borderColor;
  }
}
