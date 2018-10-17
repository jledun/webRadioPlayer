import { Component, Input } from '@angular/core';
import { MplayerRemoteService } from '../mplayer-remote.service';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-web-radio-server-play-button',
  templateUrl: './web-radio-server-play-button.component.html',
  styleUrls: ['./web-radio-server-play-button.component.css']
})
export class WebRadioServerPlayButtonComponent  {
  @Input() url: any = {};

  constructor(
    private mp: MplayerRemoteService,
    private rt: RadioTimeBrowserService
  ) { }

  playRadioTimeUrl() {
    this.rt.browseRadioTimeUrl(this.url).subscribe(
      data => {
        this.url = Object.assign({}, this.url, data);
        this.mp.play(this.url);
      }, err => {
        console.log(err);
      }, () => {}
    );
  }
  play() {
    if (this.url.hasOwnProperty('url')) return this.mp.play(this.url);
    if (this.url.hasOwnProperty('radioTimeUrl')) return this.playRadioTimeUrl();
  }

  stop() {
    this.mp.stop(this.url);
  }

}
