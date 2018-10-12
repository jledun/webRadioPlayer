import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudComponent } from './soundcloud.component';

describe('SoundcloudComponent', () => {
  let component: SoundcloudComponent;
  let fixture: ComponentFixture<SoundcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
