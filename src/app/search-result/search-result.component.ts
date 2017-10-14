import {Component} from '@angular/core';
import {SearchResult} from '../search/search.component';

@Component({
  inputs: ['result'],
  selector: 'search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
  result: SearchResult;
}
