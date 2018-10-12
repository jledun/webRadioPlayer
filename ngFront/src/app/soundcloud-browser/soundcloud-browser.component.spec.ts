import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudBrowserComponent } from './soundcloud-browser.component';

describe('SoundcloudBrowserComponent', () => {
  let component: SoundcloudBrowserComponent;
  let fixture: ComponentFixture<SoundcloudBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
