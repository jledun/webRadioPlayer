import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeBrowserItemComponent } from './radio-time-browser-item.component';

describe('RadioTimeBrowserItemComponent', () => {
  let component: RadioTimeBrowserItemComponent;
  let fixture: ComponentFixture<RadioTimeBrowserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeBrowserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeBrowserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
