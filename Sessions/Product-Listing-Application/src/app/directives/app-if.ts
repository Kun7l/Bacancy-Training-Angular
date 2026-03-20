import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]',
})
export class AppIf {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input('appIf') set appIf(condition: boolean) {
    if (condition) {
      // Create the element in the DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!condition) {
      // Remove the element from the DOM
      this.viewContainer.clear();
    }
  }
}
