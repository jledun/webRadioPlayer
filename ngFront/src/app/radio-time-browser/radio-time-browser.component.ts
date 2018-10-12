import { Component, OnInit, Input } from '@angular/core';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-radio-time-browser',
  templateUrl: './radio-time-browser.component.html',
  styleUrls: ['./radio-time-browser.component.css']
})
export class RadioTimeBrowserComponent implements OnInit {
  public browsed: any = {};
  public history: Array<any> = []
  loading: boolean = true;
  @Input() item: any = {};

  constructor(
    private radioBrowser: RadioTimeBrowserService
  ) { }

  ngOnInit() {
    if (!this.item.hasOwnProperty('body')) return this.browse();
    this.browsed = this.checkDataTopic(this.item);
    this.loading = false;
    console.log(this.browsed);
  }

  goto(i: number = 0) {
    console.log(i);
    while(this.history.length > i + 1) this.history.splice(i + 1, 1);
    console.log(this.history[i].url);
    this.browse(this.history[i].url);
  }

  checkDataTopic(data: any = {}) {
    let tmp = Object.assign({}, data);
    // check topic or stations
    let topics = 0, stations = 0, children = 0;
    tmp.body.forEach(elm => {
      topics = (elm.type === "link") ? topics + 1 : topics;
      stations = (elm.type === "audio") ? stations + 1 : stations;
      children = (elm.hasOwnProperty('children')) ? children + 1 : children;

      // conversion d'un children en radio-time-browser component
      if (elm.hasOwnProperty('children')) elm.children = Object.assign({}, {
        head: {title: elm.text, status: data.head.status}, 
        body: [].concat(elm.children)
      });

      // objet audio : création de l'objet url exploitable par webRadioItemComponent
      if (elm.type === "audio") elm.wrUrl = {
        name: ''.concat(elm.text),
        url: ''.concat(elm.URL),
        status: 'stopped'
      };
    });
    tmp.type = (topics === tmp.body.length) ? "topics" : 
      (stations === tmp.body.length) ? "audio" : 
      (children === tmp.body.length) ? "card" : "mixed";
    return tmp;
  }

  browse(item: any = {URL: ''}) {
    this.loading = true;
    this.radioBrowser.browse(item.URL || '').subscribe(
      data => {
        this.browsed = this.checkDataTopic(data);
        this.history.push(Object.assign({}, {url: item.URL, title: this.browsed.head.title, browsed: Object.assign({}, this.browsed)}));
        console.log(this.browsed);
      }, err => {
        console.log(err);
      }, () => {
        this.loading = false;
      }
    );
  }
  
}
