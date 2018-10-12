import { Component, Input } from '@angular/core';
import { MplayerRemoteService } from '../mplayer-remote.service';

@Component({
  selector: 'app-web-radio-server-play-button',
  templateUrl: './web-radio-server-play-button.component.html',
  styleUrls: ['./web-radio-server-play-button.component.css']
})
export class WebRadioServerPlayButtonComponent  {
  @Input() url: any = {};

  constructor(
    private mp: MplayerRemoteService
  ) { }

  play() {
    this.mp.play(this.url);
  }

  stop() {
    this.mp.stop(this.url);
  }

}
