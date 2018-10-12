import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RadioTimeBrowserService {
  private baseUrl: string = "http://opml.radiotime.com";
  private browseUrl: string = this.baseUrl.concat('/', "Browse.ashx");
  private urlOptions: any = {
    render: 'json'
  };
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  private parseKey(key) {
    switch(key) {
      case 'key':
      return 'c';

      default:
      return key;
    }
  }
  checkQuery(url: string = '') {
    return url.indexOf('?') >= 0;
  }
  private mergeUrlParams(url: string = '', opt: any = {}) {
    return Object.keys(this.urlOptions).reduce((acc, key, i) => {
      return acc = acc.concat((i === 0 && !this.checkQuery(url)) ? '?' : '&', key, '=', this.urlOptions[key]);
    }, '').concat((opt) ? Object.keys(opt).reduce((acc, key) => {
      return acc = acc.concat('&', this.parseKey(key), '=', opt[key]);
    }, '') : '');
  }

  public browse(url: string = '', opt: any = {}): any {
    const localUrl = url || this.browseUrl;
    return this.http.jsonp(localUrl.concat(this.mergeUrlParams(localUrl, opt)), 'callback')
  }

}
