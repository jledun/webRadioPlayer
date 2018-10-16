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
    if (item.type !=="link") return;
    this.browse.emit(item);
  }

  loading: boolean = true;

  constructor(
    private radioBrowser: RadioTimeBrowserService
  ) { }

}
