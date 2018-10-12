import { TestBed } from '@angular/core/testing';

import { RadioTimeBrowserService } from './radio-time-browser.service';

describe('RadioTimeBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadioTimeBrowserService = TestBed.get(RadioTimeBrowserService);
    expect(service).toBeTruthy();
  });
});
