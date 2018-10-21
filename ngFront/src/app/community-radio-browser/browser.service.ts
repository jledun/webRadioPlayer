import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private baseUrl="http://www.radio-browser.info/webservice/json/"
  private headers = new HttpHeaders({
    // 'access-control-allow-headers': '*',
    'Content-Type': 'application/json',
    'accept': 'application/json',
    // 'User-Agent': 'webRadioPlayer/0.1 (https://github.com/jledun/webRadioPlayer) Angular6 (made by hand with love <3, thanks Alex)'
  });

  constructor(
    private http: HttpClient
  ) { }

  toLocalStorage(item: string = '', data: any = {}): Observable<any> {
    if (!localStorage) return of(null);
    if (data === {}) return of(data);
    localStorage.setItem(item + 'List', JSON.stringify(Object.assign({}, {
      timeStamp: Date.now(),
      data: [].concat(data)
    })));
    return of(data);
  }
  fromLocalStorage(item: string = ''): Observable<any> {
    if (!localStorage) return of(null);
    return of(JSON.parse(localStorage.getItem(item + 'List')));
  }
  getHttpData(item: string = '', filter: string = '') {
    if (!item) return throwError('user must supply an item');
    return this.http.get(
      this.baseUrl.concat(item, (filter) ? '/'.concat(filter) : '', '?hidebroken=true'),
      {headers: this.headers}
    );
  }
  getHttpDataAndStore(item: string = '', filter: string = '') {
    if (!item) return throwError('user must supply an item');
    return this.getHttpData(item, filter).pipe(
      concatMap((data: any) => this.toLocalStorage(item, data))
    );
  }
  getList(item: string = '', filter: string = '') {
    if (!item) return throwError('user must supply an item');
    return this.fromLocalStorage(item).pipe(
      concatMap((data: any) => {
        if (!data || !data.timeStamp || Math.abs(Date.now() - data.timeStamp) > 3600000) 
          return this.getHttpDataAndStore(item, filter);
        return of(data.data);
      })
    );
  }
  getCountries(): Observable<any> {
    return this.getList('countries');
  }
  getStates(country: string = ''): Observable<any> {
    return (country === '') ? 
      this.getList('states') :
      this.getHttpData('states', country);
  }
  getTags(filter: string = ''): Observable<any> {
    return this.getList('tags', filter).pipe(
      map(data => data.filter(tag => tag.stationcount > 5))
    );
  }
  searchStations(filter: any = {limit: 50, offset: 0}) {
    return this.http.post(
      this.baseUrl.concat('stations/search'),
      JSON.stringify(filter),
      {headers: this.headers}
    );
  }
  getLastPlayedStations(limit: number = 50) {
    return this.http.get(
      this.baseUrl.concat('stations/lastclick/' + limit),
      {headers: this.headers}
    );
  }
  getLastChangedStations(limit: number = 50) {
    return this.http.get(
      this.baseUrl.concat('stations/lastchange/' + limit),
      {headers: this.headers}
    );
  }
  getTopVoteStations(limit: number = 50) {
    return this.http.get(
      this.baseUrl.concat('stations/topvote/' + limit),
      {headers: this.headers}
    );
  }
  getTopClickStations(limit: number = 50) {
    return this.http.get(
      this.baseUrl.concat('stations/topclick/' + limit),
      {headers: this.headers}
    );
  }

}
