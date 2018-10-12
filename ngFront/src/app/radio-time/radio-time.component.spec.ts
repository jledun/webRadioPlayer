import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeComponent } from './radio-time.component';

describe('RadioTimeComponent', () => {
  let component: RadioTimeComponent;
  let fixture: ComponentFixture<RadioTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
