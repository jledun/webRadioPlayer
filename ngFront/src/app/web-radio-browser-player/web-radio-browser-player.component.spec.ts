import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioBrowserPlayerComponent } from './web-radio-browser-player.component';

describe('WebRadioBrowserPlayerComponent', () => {
  let component: WebRadioBrowserPlayerComponent;
  let fixture: ComponentFixture<WebRadioBrowserPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioBrowserPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioBrowserPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
