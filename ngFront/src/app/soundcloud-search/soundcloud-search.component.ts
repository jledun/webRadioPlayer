import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SoundcloudService } from '../soundcloud.service';

@Component({
  selector: 'app-soundcloud-search',
  templateUrl: './soundcloud-search.component.html',
  styleUrls: ['./soundcloud-search.component.css']
})
export class SoundcloudSearchComponent implements OnInit {
  loading: boolean = false;
  firstLoad: boolean = true;
  public result: any = {};

  searchField: FormControl = new FormControl();

  constructor(
    private sc: SoundcloudService
  ) { }

  ngOnInit() {
    this.search();
  }

  getAdvancedItem(item) {
    return (item.hasOwnProperty('wrUrl')) ? 
      Object.assign({}, item) :
      Object.assign(
        {}, 
        item, 
        {
          wrUrl: {
            name: item.title, 
            url: this.sc.addDefaultOptions(item.stream_url),
            status: 'stopped'
          }
        }
      );
  }
  mapSearchData(data) {
    return Object.assign(
      {},
      data,
      {
        collection: data.collection.map(d => this.getAdvancedItem(d))
      }
    );
  }
  search() {
    this.loading = true;
    this.sc.searchTrack(this.searchField.value).subscribe(
      data => {
        this.result = this.mapSearchData(data);
        this.firstLoad = false;
      },
      err => {
        console.log(err);
        this.loading = false;
        this.firstLoad = false;
      },
      () => this.loading = false
    )
  }
  moreResults(url) {
    this.loading = true;
    this.sc.scBrowseNext(url).subscribe(
      (data: any) => {
        data.collection = [].concat(this.result.collection, data.collection);
        this.result = this.mapSearchData(data);
      }, err => {
        console.log(err);
        this.loading = false;
      }, () => this.loading = false
    );
  }

}
