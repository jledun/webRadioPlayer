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
  }

  goto(i: number = 0) {
    while(this.history.length > (i + 1)) this.history.splice(i + 1, 1);
    this.browse(this.history[i], true);
  }

  createAudioElement(elm: any) {
    return Object.assign({}, elm, {wrUrl: {
      name: ''.concat(elm.text),
      radioTimeUrl: ''.concat(elm.URL),
      status: 'stopped'
    }});
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
      // tri des éléments
      switch (elm.type) {
        case 'link':
          result.topics.push(Object.assign({}, elm));
          break;

        case 'audio':
          result.audio.push(this.createAudioElement(elm));
          break;

        case 'pivot':
          elm.children = elm.children.map(child => {
            if (child.type === "audio") return this.createAudioElement(child);
            return child;
          });
          result.pivot.push(Object.assign({}, elm));
          break;

        default:
          if (elm.hasOwnProperty('children')) {
            elm.children = elm.children.map(child => {
              if (child.type === "audio") return this.createAudioElement(child);
              return child;
            });
            result.pivot.push(Object.assign({}, elm));
          }
          break;
      }
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
      }, err => {
        console.log(err);
      }, () => {
        this.loading = false;
      }
    );
  }
  
}
