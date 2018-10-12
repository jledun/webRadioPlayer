import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioLibraryComponent } from './web-radio-library.component';

describe('WebRadioLibraryComponent', () => {
  let component: WebRadioLibraryComponent;
  let fixture: ComponentFixture<WebRadioLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
