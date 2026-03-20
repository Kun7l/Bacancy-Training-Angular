

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeatOf(collection: any[]) {
    // 1. Clear existing items
    this.viewContainer.clear();

    // 2. Loop through the array
    collection.forEach((item, index) => {
      // 3. Create a view for each item
      // The second argument is the "context" (lets us use 'let-item')
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index
      });
    });
  }
}
