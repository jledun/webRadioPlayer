import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeListComponent } from './radio-time-list.component';

describe('RadioTimeListComponent', () => {
  let component: RadioTimeListComponent;
  let fixture: ComponentFixture<RadioTimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
