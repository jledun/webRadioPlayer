import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeBrowserComponent } from './radio-time-browser.component';

describe('RadioTimeBrowserComponent', () => {
  let component: RadioTimeBrowserComponent;
  let fixture: ComponentFixture<RadioTimeBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
