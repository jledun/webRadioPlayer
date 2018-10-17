import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RadioTimeBrowserService {
  private baseUrl: string = "http://opml.radiotime.com";
  private browseUrl: string = this.baseUrl.concat('/', "Browse.ashx");
  private searchUrl: string = this.baseUrl.concat('/', "Search.ashx");
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

  createAudioElement(elm: any) {
    return Object.assign({}, elm, {wrUrl: {
      name: ''.concat(elm.text),
      radioTimeUrl: ''.concat(elm.URL),
      status: 'stopped'
    }});
  }
  checkDataTopic(data: any = {}) {
    let tmp = Object.assign({}, data);
    // check topic or stations
    let result = {
      topics: [],
      audio: [],
      pivot: []
    };
    tmp.body.forEach(elm => {
      // tri des éléments
      switch (elm.type) {
        case 'link':
          result.topics.push(Object.assign({}, elm));
          break;

        case 'audio':
          result.audio.push(this.createAudioElement(elm));
          break;

        case 'pivot':
          elm.children = elm.children.map(child => {
            if (child.type === "audio") return this.createAudioElement(child);
            return child;
          });
          result.pivot.push(Object.assign({}, elm));
          break;

        default:
          if (elm.hasOwnProperty('children')) {
            elm.children = elm.children.map(child => {
              if (child.type === "audio") return this.createAudioElement(child);
              return child;
            });
            result.pivot.push(Object.assign({}, elm));
          }
          break;
      }
    });
    return Object.keys(result).map(key => {
      if (result[key].length <= 0) return;
      return Object.assign({}, {
        head: Object.assign({}, data.head),
        body: [].concat(result[key]),
        type: key
      });
    }).filter(list => typeof list !== "undefined");
  }
  public search(query: string = ''): Observable<any> {
    console.log(query);
    if (query === '') return throwError('Query is empty');
    const opt = {
      query: query
    };
    return this.http.jsonp(this.searchUrl.concat(this.mergeUrlParams(this.searchUrl, opt)), 'callback');
  }

  public browse(url: string = '', opt: any = {}): any {
    const localUrl = url || this.browseUrl;
    return this.http.jsonp(localUrl.concat(this.mergeUrlParams(localUrl, opt)), 'callback')
  }
  public browseRadioTimeUrl(url: any = {}) {
    if (url.radioTimeUrl === '') return throwError('URL is empty');
    return this.http.jsonp(url.radioTimeUrl.concat(this.mergeUrlParams(url.radioTimeUrl, {})), 'callback')
      .pipe(
        map((data: any) => Object.assign({}, url, data.body[0]))
      );
  }

}
