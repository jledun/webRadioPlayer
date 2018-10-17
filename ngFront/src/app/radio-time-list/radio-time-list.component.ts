import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-radio-time-list',
  templateUrl: './radio-time-list.component.html',
  styleUrls: ['./radio-time-list.component.css']
})
export class RadioTimeListComponent {
  @Input() radioTimeList: any = {};
  rtList: any = {};
  @Output() browse: EventEmitter<any> = new EventEmitter();
  go(event) {
    this.browse.emit(event);
  }

  constructor(
    private rt: RadioTimeBrowserService
  ) { }

  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty('radioTimeList')) {
      const tmp: any = Object.assign({}, s.radioTimeList.currentValue);
      this.rtList.link = tmp.body.filter(i => i.type === 'link');
      this.rtList.audio = tmp.body.filter(i => i.type === 'audio').map(elm => Object.assign({}, elm, this.rt.createAudioElement(elm)));
      this.rtList.pivot = tmp.body.filter(i => i.type === 'pivot' || i.hasOwnProperty('children'));
    }
  }

}
