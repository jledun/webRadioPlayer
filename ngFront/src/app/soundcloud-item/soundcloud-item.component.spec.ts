import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcloudItemComponent } from './soundcloud-item.component';

describe('SoundcloudItemComponent', () => {
  let component: SoundcloudItemComponent;
  let fixture: ComponentFixture<SoundcloudItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundcloudItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundcloudItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
