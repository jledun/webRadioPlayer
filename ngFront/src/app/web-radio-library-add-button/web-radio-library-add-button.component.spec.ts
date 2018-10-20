import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioLibraryAddButtonComponent } from './web-radio-library-add-button.component';

describe('WebRadioLibraryAddButtonComponent', () => {
  let component: WebRadioLibraryAddButtonComponent;
  let fixture: ComponentFixture<WebRadioLibraryAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioLibraryAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioLibraryAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
