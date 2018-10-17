import { Component, OnInit, Input } from '@angular/core';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-radio-time-browser',
  templateUrl: './radio-time-browser.component.html',
  styleUrls: ['./radio-time-browser.component.css']
})
export class RadioTimeBrowserComponent implements OnInit {
  public error: string = '';
  public result: any = {};
  public history: Array<any> = []
  loading: boolean = true;
  @Input() item: any = {};

  constructor(
    private rt: RadioTimeBrowserService
  ) { }

  ngOnInit() {
    if (!this.item.hasOwnProperty('body')) return this.browse();
    this.result = Object.assign({}, this.item);
    this.loading = false;
  }

  goto(i: number = 0) {
    while(this.history.length > (i + 1)) this.history.splice(i + 1, 1);
    this.browse(this.history[i], true);
  }

  
  browse(item: any = {URL: ''}, dontpush: boolean = false) {
    this.loading = true;
    this.rt.browse(item.URL || '').subscribe(
      data => {
        this.result = Object.assign({}, data);
        console.log(this.result);
        if (!dontpush) this.history.push(Object.assign({}, {URL: item.URL, title: this.result.head.title}));
      }, err => {
        this.error = err.name + " - " + err.statusText
        this.loading = false;
      }, () => {
        this.error = '';
        this.loading = false;
      }
    );
  }
  
}
