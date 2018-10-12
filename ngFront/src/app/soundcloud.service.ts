import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoundcloudService {
  private client_id="93e33e327fd8a9b77becd179652272e2"; // stolen from https://github.com/mopidy/mopidy-soundcloud

  private baseUrl: string = "http://api.soundcloud.com/";
  private urlOptions: any = {
    client_id: this.client_id,
    limit: 25,
    linked_partitioning: 1
  };
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  checkQuery(url: string = '') {
    return url.indexOf('?') >= 0;
  }
  private mergeUrlParams(opt: any = {}) {
    return Object.keys(this.urlOptions).reduce((acc, key, i) => {
      return acc = acc.concat((i === 0) ? '?' : '&', key, '=', this.urlOptions[key]);
    }, '').concat((opt) ? Object.keys(opt).reduce((acc, key) => {
      return acc = acc.concat('&', key, '=', opt[key]);
    }, '') : '');
  }
  addDefaultOptions(url) {
    return url.concat(this.mergeUrlParams());
  }

  searchTrack(query: string = '') {
    return this.scQuery('tracks', {q: query});
  }
  navigateGenres(query: string = '') {
    return this.scQuery('tracks', {genres: query});
  }
  scQuery(scApi: string = '', query: object = {}) {
    return this.http.get(this.baseUrl.concat(scApi, this.mergeUrlParams(query)), {headers: this.headers});
  }
  scBrowseNext(url) {
    return this.http.get(url, {headers: this.headers});
  }

}
