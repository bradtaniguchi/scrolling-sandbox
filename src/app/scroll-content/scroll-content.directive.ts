import {
  Directive,
  ContentChildren,
  OnInit,
  HostListener,
  OnDestroy,
<<<<<<< Updated upstream
  ElementRef
=======
<<<<<<< HEAD
  ElementRef,
  QueryList
=======
  ElementRef
>>>>>>> fb8e34a52cff854e5907fc29045925fafb532e9f
>>>>>>> Stashed changes
} from '@angular/core';
import { ScrollElementDirective } from './scroll-element.directive';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appScrollContent]'
})
export class ScrollContentDirective implements OnInit, OnDestroy {
  @ContentChildren(ScrollElementDirective)
<<<<<<< Updated upstream
  scrollElements: ScrollElementDirective[];
=======
<<<<<<< HEAD
  scrollElements: QueryList<ScrollElementDirective>;
=======
  scrollElements: ScrollElementDirective[];
>>>>>>> fb8e34a52cff854e5907fc29045925fafb532e9f
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    console.log('test with scrollElements', this.scrollElements);
=======
<<<<<<< HEAD
    console.log('test with scrollElements', this.scrollElements.length);
=======
    console.log('test with scrollElements', this.scrollElements);
>>>>>>> fb8e34a52cff854e5907fc29045925fafb532e9f
>>>>>>> Stashed changes
  }
}
