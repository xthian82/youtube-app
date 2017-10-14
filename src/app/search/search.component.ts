import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {SearchResult} from '../model/search-result';
import {YoutubeService} from './youtube-service';

@Component({
  outputs: ['loading', 'results'],
  selector: 'search-box',
  template: `<input type="text" class="form-control" placeholder="Search" autofocus>`
})
export class SearchComponent implements OnInit {
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public youtube: YoutubeService, private el: ElementRef) {
  }

  ngOnInit(): void {
    // convert keyup event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
    .map((e: any) => e.target.value) // extract the value of the input
    .filter((text: string) => text.length > 1) // filter if empty
    .debounceTime(300)
    .do(() => this.loading.next(true)) // enable loading
    .map((query: string) => this.youtube.search(query))
    .switch()
    .subscribe(
        (results: SearchResult[]) => { // on success
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
    )
  }
}
