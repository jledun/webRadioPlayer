import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MplayerRemoteService {
  private socket;
  private httpHeaders;
  private serverUrl; 
  private apiUrl;
  private _url: Array<any> = [];
  private _status: any = {};
  public get url() {
    return this._url;
  }
  public set url(val) {
    this._url = val.map(v => Object.assign({}, v, {status: 'stopped'}));
  }
  public get status() {
    return this._status;
  }
  public set status(val) {
    this._status = Object.assign({}, val);
    this._url.forEach(u => u.status = "stopped");
    const index = this._url.findIndex(u => u.name === val.url.name);
    if (index >= 0) this._url[index].status = val.status;
  }

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.serverUrl = new URL(window.location.href);
    this.socket = io(this.serverUrl.origin);
    this.socket.on('url', url => this.url = url);
    this.socket.on('status', status => this.status = status);
   
    this.apiUrl = this.serverUrl.origin.concat('/fileActions');
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    this.getUrl();
  }

  checkSocket() {
    return (this.socket 
      && this.socket.hasOwnProperty('connected')
      && this.socket.connected) ? true : false;
  }
  play(url) {
    if (!this.checkSocket()) return;
    this.socket.emit('playStream', url);
  }
  stop(url) {
    if (!this.checkSocket()) return;
    this.socket.emit('stopStream');
  }
  volumeUp() {
    if (!this.checkSocket()) return;
    this.socket.emit('volumeUp');
  }
  volumeDown() {
    if (!this.checkSocket()) return;
    this.socket.emit('volumeDown');
  }

  private success(data) {
    this.url = [].concat(data);
    this.snackBar.open('Données mises à jour :-)', 'Ok', {duration: 2000});
  }
  private failure(err) {
    console.error(err);
    this.snackBar.open("Une erreur s'est produite", 'Ok', {duration: 2000})
  }

  public getUrl() {
    this.http.get(this.apiUrl, {headers: this.httpHeaders}).subscribe(
      data => this.success(data),
      err => this.failure(err),
      () => {}
    );
  }
  public addUrl(url) {
    this.http.post(this.apiUrl, url, {headers: this.httpHeaders}).subscribe(
      data => this.success(data),
      err => this.failure(err),
      () => {}
    );
  }
  public updateUrl(url) {
    this.http.put(this.apiUrl.concat('/', url.id.toString()), url, {headers: this.httpHeaders}).subscribe(
      data => this.success(data),
      err => this.failure(err),
      () => {}
    );
  }
  public deleteUrl(url) {
    this.http.delete(this.apiUrl.concat('/', url.id.toString()), {headers: this.httpHeaders}).subscribe(
      data => this.success(data),
      err => this.failure(err),
      () => {}
    );
  }

}
