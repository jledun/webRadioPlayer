import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRadioBrowserComponent } from './community-radio-browser.component';

describe('CommunityRadioBrowserComponent', () => {
  let component: CommunityRadioBrowserComponent;
  let fixture: ComponentFixture<CommunityRadioBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityRadioBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityRadioBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
