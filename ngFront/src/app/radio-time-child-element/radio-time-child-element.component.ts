import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-time-child-element',
  templateUrl: './radio-time-child-element.component.html',
  styleUrls: ['./radio-time-child-element.component.css']
})
export class RadioTimeChildElementComponent {
  @Input() child: any = {};

  constructor() { }

}
