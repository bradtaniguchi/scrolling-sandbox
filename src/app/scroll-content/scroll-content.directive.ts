import {
  ContentChildren,
  Directive,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, map, filter } from 'rxjs/operators';
import { ScrollElementDirective } from './scroll-element.directive';
import { ScrollContentService } from './scroll-content.service';

@Directive({
  selector: '[appScrollContent]'
})
export class ScrollContentDirective implements OnInit, OnDestroy {
  /**
   * the time between emissions, higher numbers will decrease the level of emissions, lower
   * will increase the amount of checks per second when scrolling.
   * Defaults to 100
   */
  @Input() debounceTime = 100;
  /**
   * The element currently scrolled to.
   */
  @Output() element = new EventEmitter<ScrollElementDirective<any>>();

  @ContentChildren(ScrollElementDirective)
  scrollElements: QueryList<ScrollElementDirective<any>>;

  private takeUntil = new Subject();
  private onScroll$ = new Subject<UIEvent>();
  @HostListener('scroll', ['$event']) onScroll(event: UIEvent) {
    this.onScroll$.next(event);
  }
  constructor(
    private elementRef: ElementRef,
    private scrollContentService: ScrollContentService
  ) {}

  ngOnInit() {
    this.onScroll$
      .pipe(
        debounceTime(this.debounceTime),
        map(() => this.getElementInRange()),
        filter(_ => !!_),
        takeUntil(this.takeUntil)
      )
      .subscribe(element => this.element.emit(element));
  }

  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }

  private getElementInRange(): ScrollElementDirective<any> | undefined {
    const elements = this.scrollElements
      .toArray()
      .map(({ elementRef }) => elementRef.nativeElement);
    const scrollTop = (this.elementRef.nativeElement as HTMLElement).scrollTop;

    return this.scrollContentService.findElementInRange({
      elements,
      scrollTop
    });
  }
}
