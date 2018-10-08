import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRadioEditorComponent } from './web-radio-editor.component';

describe('WebRadioEditorComponent', () => {
  let component: WebRadioEditorComponent;
  let fixture: ComponentFixture<WebRadioEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRadioEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRadioEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
