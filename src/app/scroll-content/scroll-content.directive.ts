import {
  Directive,
  ContentChildren,
  OnInit,
  HostListener,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { ScrollElementDirective } from './scroll-element.directive';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appScrollContent]'
})
export class ScrollContentDirective implements OnInit, OnDestroy {
  @ContentChildren(ScrollElementDirective)
  scrollElements: ScrollElementDirective[];

  private takeUntil = new Subject();
  private onScroll$ = new Subject();
  @HostListener('scroll', ['$event']) onScroll(event: UIEvent) {
    this.onScroll$.next(event);
  }
  constructor() {}

  ngOnInit() {
    console.log('test with scrollElements', this.scrollElements);
    this.onScroll$
      .pipe(debounceTime(100), takeUntil(this.takeUntil))
      .subscribe(event => this.test());
  }

  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }

  private test() {
    console.log('test with scrollElements', this.scrollElements);
  }
}
