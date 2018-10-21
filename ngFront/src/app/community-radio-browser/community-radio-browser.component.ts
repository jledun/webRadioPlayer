import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { BrowserService } from './browser.service';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, debounceTime, finalize, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-community-radio-browser',
  templateUrl: './community-radio-browser.component.html',
  styleUrls: ['./community-radio-browser.component.css']
})
export class CommunityRadioBrowserComponent implements OnInit {

  firstLoad: boolean = true;
  stationListLoading: boolean = true;
  uiTool: FormGroup;

  stationList: Array<any> = [];

  private filterDefaultValue: any = {
    limit: 50,
    offset: 0,
    order: 'vote'
  }
  public _filter: any = this.filterDefaultValue;
  resetFilter() {
    this.stationListLoading = true;
    this._filter = this.filterDefaultValue;
  }
  get filter() {
    return this._filter;
  }
  set filter(value) {
    this._filter = Object.assign({}, this._filter, value);
    this._filter.tag = (this.selectedTagList.length > 0) ? 
      this.selectedTagList.reduce((acc, tag) => acc = acc.concat(tag.value), '') : 
      '';
    if (this.firstLoad) return;
    this.stationListLoading = true;
    if (
      (!this._filter.country || this._filter.country === '') &&
      (!this._filter.state || this._filter.state === '') &&
      (!this._filter.name || this._filter.name === '') &&
      (!this._filter.tag || this._filter.tag === '')
    ) {
      this.resetFilter();
      this.b.getLastPlayedStations();
    }else{
      this.b.searchStations(this._filter).subscribe(
        data => this.updateStationList(data),
        err => console.log(err),
        () => {}
      )
    }
  }

  countryList: Array<any> = [];
  filteredCountryList: Observable<any[]>;
  countryListIsLoading: boolean = false;

  stateList: Array<any> = [];
  filteredStateList: Observable<any[]>;
  stateListIsLoading: boolean = false;

  tagList: Array<any> = [];
  selectedTagList: Array<any> = [];
  filteredTagList: Observable<any[]>;
  tagListIsLoading: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private b: BrowserService
  ) {
    this.uiTool = this.fb.group({
      country: '',
      state: '',
      name: '',
      order: 'vote'
    });
  }

  ngOnInit() {
    this.filteredCountryList = this.uiTool.get('country').valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountryList(value))
    );
    this.uiTool.get('country').valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      concatMap(val => {
        if (val === '') return of(null);
        return this.getStateList(val);
      })
    ).subscribe(
      data => {},
      err => console.log(err),
      () => {}
    );
    this.filteredStateList = this.uiTool.get('state').valueChanges.pipe(
      startWith(''),
      map(value => this.filterStateList(value))
    );
    this.filteredTagList = this.tags.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => (value) ? this.filterTagList(value) : this.tagList.slice())
    );
    this.uiTool.valueChanges.pipe(
      startWith({}),
      debounceTime(2000)
    ).subscribe(
      data => {
        if(data !== {}) this.filter = data
      }
    );
    this.loadAllDatas().subscribe(
      data => this.updateStationList(data),
      err => console.log(err),
      () => {}
    )
  }

  displayMoreResult() {
    return this.stationList.length >= (this.filter.limit + this.filter.offset);
  }
  moreResults() {
    if (this.stationList.length < (this.filter.limit + this.filter.offset)) return;
    this.filter = Object.assign({}, this.filter, {
      offset: this.filter.offset + this.filter.limit
    });
  }
  updateStationList(data) {
    if (this.filter.offset === 0) {
      this.stationList = [].concat(data);
    }else{
      this.stationList = this.stationList.concat(data);
    }
    this.stationList.forEach(station => {
      if (!station.hasOwnProperty('status')) station.status = 'stopped';
      if (!station.hasOwnProperty('image')) station.image = (station.favicon) ? station.favicon : '';
      if (!station.librarySource) station.librarySource = 'community';
    });
    this.stationListLoading = false;
    this.firstLoad = false;
  }
  getTopClickStations() {
    this.resetFilter();
    this.b.getTopClickStations(this.filter.limit).subscribe(
      data => this.updateStationList(data),
      err => console.log(err),
      () => {}
    )
  }
  getTopVoteStations() {
    this.resetFilter();
    this.b.getTopVoteStations(this.filter.limit).subscribe(
      data => this.updateStationList(data),
      err => console.log(err),
      () => {}
    )
  }
  getLastChangedStations() {
    this.resetFilter();
    this.b.getLastChangedStations(this.filter.limit).subscribe(
      data => this.updateStationList(data),
      err => console.log(err),
      () => {}
    )
  }

  loadAllDatas(): Observable<any> {
    return this.getCountryList().pipe(
      concatMap(val => this.getStateList()),
      concatMap(val => this.getTagList()),
      concatMap(value => this.b.getLastPlayedStations()),
    );
  }
  getCountryList(): Observable<any[]> {
    if (this.countryList.length > 0) return of(this.countryList);
    if (this.countryListIsLoading) return of(this.countryList);
    this.countryListIsLoading = true;
    return this.b.getCountries().pipe(
      map(data => this.countryList = [].concat(data)),
      finalize(() => this.countryListIsLoading = false)
    );
  }
  getStateList(country: string = ''): Observable<any[]> {
    if (this.stateListIsLoading) return of(this.stateList);
    this.stateListIsLoading = true;
    return this.b.getStates(country).pipe(
      map(data => this.stateList = [].concat(data)),
      finalize(() => this.stateListIsLoading = false)
    );
  }
  getTagList(filter: string = ''): Observable<any[]> {
    if (this.tagListIsLoading) return of(this.tagList);
    this.tagListIsLoading = true;
    return this.b.getTags(filter).pipe(
      map(data => this.tagList = [].concat(data)),
      finalize(() => this.tagListIsLoading = false)
    );
  }
  
  private filterCountryList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(country => country.name.toLowerCase().includes(filterValue));
  }
  private filterStateList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  private filterTagList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagList.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

  // TAGS CHIP LIST MANAGEMENT
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim().toLowerCase();
    const index = this.tagList.findIndex(t => t.name.toLowerCase() === value);
    if ((value || '')) {
      this.selectedTagList.push((index >= 0) ? 
        Object.assign({}, this.tagList[index]) :
        Object.assign({}, {
          name: value.toLowerCase(),
          value: value.toLowerCase(),
          stationcount: 0
        })
      );
      this.filter = Object.assign({}, this.filter);
    }
    if (input) input.value = '';
    this.tags.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.selectedTagList.indexOf(tag);
    if (index >= 0) {
      this.selectedTagList.splice(index, 1);
      this.filter = Object.assign({}, this.filter, {tag: ''});
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.selectedTagList.push(this.tagList.find(t => t.name === event.option.value));
    this.tagInput.nativeElement.value = '';
    this.tags.setValue(null);
    this.filter = Object.assign({}, this.filter);
  }

}
