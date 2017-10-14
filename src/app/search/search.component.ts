import {Component, ElementRef, EventEmitter, Inject, Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

export var YOUTUBE_API_KEY: string = 'AIzaSyA6Cfq19pPOuOWQA6_RLSQpOjnwFa7_dJk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';
// export let loadingGif = ((<any>window).__karma__) ? '' : require('assets/loading.gif');

export class SearchResult {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || null;
    this.description = obj && obj.description || null;
    this.thumbnailUrl = obj && obj.thumbnailUrl || null;
    this.videoUrl = obj && obj.videoUrl || `https://youtube.com/watch?v=${this.id}`;
  }
}

@Injectable()
export class YoutubeService {
  constructor(public http: Http,
              @Inject(YOUTUBE_API_KEY) private apiKey: string,
              @Inject(YOUTUBE_API_URL) private apiUrl: string) {
  }

  search(query: string): Observable<SearchResult[]> {
    const params = [`q=${query}`, `key=${this.apiKey}`, `part=snippet`, `type=video`, `maxResults=10`].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}

export let youtubeServiceInjectables: Array<any> = [
  {provide: YoutubeService, useClass: YoutubeService},
  {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
  {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
];

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
    .debounceTime(250) // every 250ms
    .do(() => this.loading.next(true)) // enable loading
    // search, discarding old event if new inputs comes in
    .map((query: string) => this.youtube.search(query))
    .switch()
    .subscribe(
      // act on the return of the search
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
