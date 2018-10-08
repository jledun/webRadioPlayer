import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MplayerRemoteService {
  private socket;
  private serverUrl; 
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
    snackBar: MatSnackBar
  ) {
    this.serverUrl = new URL(window.location.href);
    // this.socket = io(this.serverUrl.href);
    this.socket = io('http://192.168.1.108:6680');
    this.socket.on('url', url => this.url = url);
    this.socket.on('status', status => this.status = status);
    this.socket.emit('getUrl');
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


}
