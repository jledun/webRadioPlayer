import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioServerPlayButtonComponent } from './web-radio-server-play-button.component';

describe('WebRadioServerPlayButtonComponent', () => {
  let component: WebRadioServerPlayButtonComponent;
  let fixture: ComponentFixture<WebRadioServerPlayButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioServerPlayButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioServerPlayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
