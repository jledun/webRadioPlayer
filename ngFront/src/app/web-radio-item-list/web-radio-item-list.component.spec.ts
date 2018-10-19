import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioItemListComponent } from './web-radio-item-list.component';

describe('WebRadioItemListComponent', () => {
  let component: WebRadioItemListComponent;
  let fixture: ComponentFixture<WebRadioItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
