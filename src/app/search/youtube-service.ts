import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {SearchResult} from '../model/search-result';

export let YOUTUBE_API_KEY = 'AIzaSyA6Cfq19pPOuOWQA6_RLSQpOjnwFa7_dJk';
export let YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

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
