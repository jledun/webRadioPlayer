import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-web-radio-item-list',
  templateUrl: './web-radio-item-list.component.html',
  styleUrls: ['./web-radio-item-list.component.css']
})
export class WebRadioItemListComponent implements AfterViewInit {
  @Input() webRadio: any = {
    name: '',
    url: '',
    genre: '',
    tags: '',
    country: '',
    favicon: ''
  };
  imgUrl: string = '';
  tout;

  constructor() { }

  ngAfterViewInit() {
    this.tout = setTimeout(() => {
      this.imgUrl = this.webRadio.image;
    }, 1500 * Math.random());
  }

  ngOnDestroy() {
    if (this.tout) clearTimeout(this.tout);
  }

}
