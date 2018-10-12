import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioBrowserPlayerButtonComponent } from './web-radio-browser-player-button.component';

describe('WebRadioBrowserPlayerButtonComponent', () => {
  let component: WebRadioBrowserPlayerButtonComponent;
  let fixture: ComponentFixture<WebRadioBrowserPlayerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioBrowserPlayerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioBrowserPlayerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
