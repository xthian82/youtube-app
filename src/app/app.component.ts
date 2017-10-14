import {Component} from '@angular/core';
import {SearchResult} from './search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  results: SearchResult[];

  updateResults(results: SearchResult[]): void {
    this.results = results;
  }
}
