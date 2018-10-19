import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-web-radio-item-list',
  templateUrl: './web-radio-item-list.component.html',
  styleUrls: ['./web-radio-item-list.component.css']
})
export class WebRadioItemListComponent {
  @Input() webRadio: any = {
    name: '',
    url: '',
    genre: '',
    tags: '',
    country: '',
    favicon: ''
  };

  constructor() { }

}
