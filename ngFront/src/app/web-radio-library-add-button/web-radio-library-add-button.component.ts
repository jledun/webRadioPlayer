import { Component, Input } from '@angular/core';
import { MplayerRemoteService } from '../mplayer-remote.service';

@Component({
  selector: 'app-web-radio-library-add-button',
  templateUrl: './web-radio-library-add-button.component.html',
  styleUrls: ['./web-radio-library-add-button.component.css']
})
export class WebRadioLibraryAddButtonComponent {
  @Input() url: any = {}

  constructor(
    private mp: MplayerRemoteService
  ) { }

  addToLibrary() {
    this.mp.addUrl(this.url);
  }

}
