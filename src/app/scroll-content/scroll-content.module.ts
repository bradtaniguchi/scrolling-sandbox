import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollContentDirective } from './scroll-content.directive';
import { ScrollElementDirective } from './scroll-element.directive';

@NgModule({
  declarations: [ScrollContentDirective, ScrollElementDirective],
  imports: [CommonModule],
  exports: [ScrollContentDirective, ScrollElementDirective]
})
export class ScrollContentModule {}
