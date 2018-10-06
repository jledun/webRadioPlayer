import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-web-radio-item',
  templateUrl: './web-radio-item.component.html',
  styleUrls: ['./web-radio-item.component.css']
})
export class WebRadioItemComponent {
  @Input() url: any = {};
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() stop: EventEmitter<any> = new EventEmitter();
  @Output() pause: EventEmitter<any> = new EventEmitter();

  constructor() { }

  actionPlay() {
    this.play.emit(this.url);
  }
  actionStop() {
    this.stop.emit(this.url);
  }
  actionPause() {
    this.pause.emit(this.url);
  }

}
