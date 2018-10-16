import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeChildElementComponent } from './radio-time-child-element.component';

describe('RadioTimeChildElementComponent', () => {
  let component: RadioTimeChildElementComponent;
  let fixture: ComponentFixture<RadioTimeChildElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeChildElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeChildElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
