import { TestBed } from '@angular/core/testing';

import { SoundcloudService } from './soundcloud.service';

describe('SoundcloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundcloudService = TestBed.get(SoundcloudService);
    expect(service).toBeTruthy();
  });
});
