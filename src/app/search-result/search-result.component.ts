import {Component} from '@angular/core';
import {SearchResult} from '../model/search-result';

@Component({
  inputs: ['result'],
  selector: 'search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
  result: SearchResult;
}
