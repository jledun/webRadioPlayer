import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeSearchEngineComponent } from './radio-time-search-engine.component';

describe('RadioTimeSearchEngineComponent', () => {
  let component: RadioTimeSearchEngineComponent;
  let fixture: ComponentFixture<RadioTimeSearchEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTimeSearchEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
