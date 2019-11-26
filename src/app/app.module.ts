import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollContentModule } from './scroll-content/scroll-content.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ScrollContentModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
