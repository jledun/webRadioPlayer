import { Component, OnInit, Input } from '@angular/core';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-radio-time-browser',
  templateUrl: './radio-time-browser.component.html',
  styleUrls: ['./radio-time-browser.component.css']
})
export class RadioTimeBrowserComponent implements OnInit {
  public browsables: Array<any> = [];
  public browsed: any = {};
  public history: Array<any> = []
  loading: boolean = true;
  @Input() item: any = {};

  constructor(
    private radioBrowser: RadioTimeBrowserService
  ) { }

  ngOnInit() {
    if (!this.item.hasOwnProperty('body')) return this.browse();
    this.browsables.push(this.checkDataTopic(this.item));
    this.loading = false;
    console.log(this.browsables);
  }

  goto(i: number = 0) {
    while(this.history.length > (i + 1)) this.history.splice(i + 1, 1);
    this.browse(this.history[i], true);
  }

  checkDataTopic(data: any = {}) {
    let tmp = Object.assign({}, data);
    // check topic or stations
    let result = {
      topics: [],
      audio: [],
      pivot: []
    };
    tmp.body.forEach(elm => {
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

      // tri des éléments
      if (elm.type === "link") result.topics.push(Object.assign({}, elm));
      if (elm.type === "audio") result.audio.push(Object.assign({}, elm));
      if (elm.type === "pivot") result.pivot.push(Object.assign({}, elm));
      if (elm.hasOwnProperty('children')) result.pivot.push(Object.assign({}, elm));
    });
    return Object.keys(result).map(key => {
      if (result[key].length <= 0) return;
      return Object.assign({}, {
        head: Object.assign({}, data.head),
        body: [].concat(result[key]),
        type: key
      });
    }).filter(list => typeof list !== "undefined");
  }

  browse(item: any = {URL: ''}, dontpush: boolean = false) {
    this.loading = true;
    this.radioBrowser.browse(item.URL || '').subscribe(
      data => {
        this.browsables = this.checkDataTopic(data);
        if (!dontpush) this.history.push(Object.assign({}, {URL: item.URL, title: this.browsables[0].head.title}));
        console.log(this.browsables);
      }, err => {
        console.log(err);
      }, () => {
        this.loading = false;
      }
    );
  }
  
}
