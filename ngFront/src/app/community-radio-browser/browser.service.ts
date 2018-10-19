import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getCountries(filter: string = ''): Observable<any> {
    return this.http.get(
      this.baseUrl.concat('countries', (filter) ? '/'.concat(filter) : ''), 
      {headers: this.headers}
    );
  }
  getRegions(country: string = ''): Observable<any> {
    return this.http.get(
      this.baseUrl.concat('states', (country) ? '/'.concat(country, '/') : ''), 
      {headers: this.headers}
    );
  }
  getTags(filter: string = ''): Observable<any> {
    return this.http.get(
      this.baseUrl.concat('tags', (filter) ? '/'.concat(filter) : ''), 
      {headers: this.headers}
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
