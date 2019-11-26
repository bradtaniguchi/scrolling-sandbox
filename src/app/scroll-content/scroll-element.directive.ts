import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollElement]'
})
export class ScrollElementDirective<T> {
  /**
   * A data payload that can be passed along.
   */
  @Input() public data: T;
  constructor(public elementRef: ElementRef) {}
}
