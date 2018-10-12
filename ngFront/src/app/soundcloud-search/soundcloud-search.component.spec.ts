import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudSearchComponent } from './soundcloud-search.component';

describe('SoundcloudSearchComponent', () => {
  let component: SoundcloudSearchComponent;
  let fixture: ComponentFixture<SoundcloudSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
