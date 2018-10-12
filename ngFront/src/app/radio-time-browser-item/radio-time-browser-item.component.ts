import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RadioTimeBrowserService } from '../radio-time-browser.service';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';

@Component({
  selector: 'app-radio-time-browser-item',
  templateUrl: './radio-time-browser-item.component.html',
  styleUrls: ['./radio-time-browser-item.component.css']
})
export class RadioTimeBrowserItemComponent {
  @Input() browsed: any = {}
  @Output() browse: EventEmitter<any> = new EventEmitter();
  go(item) {
    this.browse.emit(item);
  }

  loading: boolean = true;

  constructor(
    private radioBrowser: RadioTimeBrowserService
  ) { }

  play(item) {
    console.log("play item");
    console.log(item);
    this.radioBrowser.browse(item.url).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {}
    )
  }
  stop(item) {
    console.log("stop item");
    console.log(item);
  }
  pause(item) {
    console.log('pause item');
    console.log(item);
  }

}
