import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SearchComponent, youtubeServiceInjectables} from './search/search.component';
import {HttpModule} from '@angular/http';
import {SearchResultComponent} from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [youtubeServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule {
}
