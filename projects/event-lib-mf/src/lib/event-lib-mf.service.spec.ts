import { TestBed } from '@angular/core/testing';

import { EventLibMfService } from './event-lib-mf.service';

describe('EventLibMfService', () => {
  let service: EventLibMfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventLibMfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
