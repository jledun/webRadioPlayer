import { Component, OnInit } from '@angular/core';
import { BrowserService } from '../browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(
    private b: BrowserService
  ) { }

  ngOnInit() {
    this.b.getCountries().subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {}
    );
  }

}
