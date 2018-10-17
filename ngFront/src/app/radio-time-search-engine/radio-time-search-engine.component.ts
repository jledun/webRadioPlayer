import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-radio-time-search-engine',
  templateUrl: './radio-time-search-engine.component.html',
  styleUrls: ['./radio-time-search-engine.component.css']
})
export class RadioTimeSearchEngineComponent {
  public result: any = {};
  public error: string = '';
  searchField: FormControl = new FormControl();

  constructor(
    private rt: RadioTimeBrowserService
  ) { }

  clearSearch() {
    this.result = {};
    this.searchField.setValue('');
  }

  browse(url: any) {
    console.log("radio-time-search-engine browse");
    console.log(url);
  }

  search(event) {
    console.log(this.searchField.value);
    if (this.searchField.value === '') return;
    this.rt.search(this.searchField.value).subscribe(
      data => {
        this.result = Object.assign({}, data);
        console.log(this.result);
      }, err => {
        console.log(err);
        this.error = err.name + " - " + err.statusText
      }, () => {}
    );
  }

}
