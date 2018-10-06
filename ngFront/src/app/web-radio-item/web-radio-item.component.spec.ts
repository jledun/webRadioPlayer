import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioItemComponent } from './web-radio-item.component';

describe('WebRadioItemComponent', () => {
  let component: WebRadioItemComponent;
  let fixture: ComponentFixture<WebRadioItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
