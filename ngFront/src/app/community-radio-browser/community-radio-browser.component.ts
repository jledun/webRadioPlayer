import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
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

  genLoading: boolean = true;
  uiTool: FormGroup;

  stationList: Array<any> = [];

  private filterDefaultValue: any = {
    limit: 50,
    offset: 0,
    order: 'vote'
  }
  private _filter: any = this.filterDefaultValue;
  resetFilter() {
    this._filter = this.filterDefaultValue;
  }
  get filter() {
    return this._filter;
  }
  set filter(value) {
    this._filter = value;
    this.b.searchStations(this._filter).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {}
    )
  }

  countryList: Array<any> = [];
  filteredCountryList: Observable<any[]>;
  countryListIsLoading: boolean = false;

  regionList: Array<any> = [];
  filteredRegionList: Observable<any[]>;
  regionListIsLoading: boolean = false;

  tagList: Array<any> = [];
  selectedTagList: Array<any> = [];
  filteredTagList: Observable<any[]>;
  tagListIsLoading: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private b: BrowserService
  ) {
    this.uiTool = this.fb.group({
      country: '',
      region: '',
      language: '',
      tags: [''],
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
      debounceTime(500),
      concatMap(val => this.getRegionList(val))
    ).subscribe(
      data => {},
      err => console.log(err),
      () => {}
    );
    this.filteredRegionList = this.uiTool.get('region').valueChanges.pipe(
      startWith(''),
      map(value => this.filterRegionList(value))
    );
    this.filteredTagList = this.uiTool.get('tags').valueChanges.pipe(
      startWith(''),
      map((value: string | null) => (value) ? this.filterTagList(value) : this.tagList.slice())
    );
    this.uiTool.valueChanges.pipe(
      startWith({}),
      debounceTime(2000)
    ).subscribe(
      data => console.log('formGroup.valueChanges', data, this.selectedTagList)
    );
    this.refreshFilterDatas();
    this.b.getLastPlayedStations(this.filter.limit).subscribe(
      data => this.updateStationList(data),
      err => console.log(err),
      () => {}
    )
  }

  moreResults() {
    this.filter.offset = this.filter.offset + this.filter.limit;
  }
  updateStationList(data) {
    if (this.filter.offset === 0) {
      this.stationList = [].concat(data);
    }else{
      this.stationList = this.stationList.concat(data);
    }
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

  refreshFilterDatas(): void {
    this.getTagList().pipe(
      concatMap(value => this.getCountryList()),
      concatMap(val => this.getRegionList())
    ).subscribe(
      data => {},
      err => console.log(err),
      () => {}
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
  getRegionList(country: string = ''): Observable<any[]> {
    if (this.regionListIsLoading) return of(this.regionList);
    this.regionListIsLoading = true;
    return this.b.getRegions(country).pipe(
      map(data => this.regionList = [].concat(data)),
      finalize(() => this.regionListIsLoading = false)
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
  private filterRegionList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.regionList.filter(region => region.name.toLowerCase().includes(filterValue));
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
    }
    if (input) input.value = '';
    this.uiTool.get('tags').setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.selectedTagList.indexOf(tag);
    if (index >= 0) {
      this.selectedTagList.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.selectedTagList.push(this.tagList.find(t => t.name === event.option.value));
    this.tagInput.nativeElement.value = '';
    this.uiTool.get('tags').setValue(null);
  }

}
