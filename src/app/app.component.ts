import { Component } from '@angular/core';
import { WORDS } from './words';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  public words = WORDS;
  public headers = [
    'ONE',
    'TWO',
    'THREE'
  ];
}
