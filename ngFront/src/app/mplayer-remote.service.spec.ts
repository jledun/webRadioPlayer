import { TestBed } from '@angular/core/testing';

import { MplayerRemoteService } from './mplayer-remote.service';

describe('MplayerRemoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MplayerRemoteService = TestBed.get(MplayerRemoteService);
    expect(service).toBeTruthy();
  });
});
