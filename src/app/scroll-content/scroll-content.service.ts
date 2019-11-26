import { Injectable } from '@angular/core';
import { ScrollElementDirective } from './scroll-element.directive';

@Injectable({
  providedIn: 'root'
})
export class ScrollContentService {
  /**
   * Returns the absolute height of an element without parts of CSS.
   * taken from: https://stackoverflow.com/a/23749355
   * @param element the HTMLElement to get the height for
   */
  public getAbsoluteHeight(element: HTMLElement): number {
    const styles = getComputedStyle(element);
    return Math.ceil(
      element.offsetHeight +
        parseFloat(styles.marginTop || '0') +
        parseFloat(styles.marginBottom || '0')
    );
  }

  /**
   * Returns the element that is within range according to the scrollTop number of the
   * parent content (ScrollContent)
   */
  public findElementInRange(params: {
    elements: ScrollElementDirective<any>[];
    scrollTop: number;
  }): ScrollElementDirective<any> | undefined;
  public findElementInRange(params: {
    elements: HTMLElement[];
    scrollTop: number;
  }): HTMLElement | undefined;
  public findElementInRange(params: {
    elements: any[];
    scrollTop: number;
  }): any {
    const { elements } = params;
    const getElement = (element: ScrollElementDirective<any> | HTMLElement) =>
      element instanceof ScrollElementDirective
        ? element.elementRef.nativeElement
        : (element as HTMLElement);

    for (const element of elements) {
      if (this.isInRange({ ...params, element: getElement(element) })) {
        return element;
      }
    }
    return undefined;
  }

  /**
   * Returns if the given element is within range of the current scroll via scrollTop.
   */
  public isInRange(params: {
    /**
     * The element we will get the scrolling values for.
     * We will get the absolute height of the element, and its offsetTop
     */
    element: HTMLElement;
    /**
     * The number of pixels that the parent content (ScrollContent) has been scrolled.
     */
    scrollTop: number;
  }): boolean {
    const { element, scrollTop } = params;
    const { offsetTop } = element;
    const height = this.getAbsoluteHeight(element);
    return scrollTop >= offsetTop && scrollTop <= offsetTop + height;
  }
}
