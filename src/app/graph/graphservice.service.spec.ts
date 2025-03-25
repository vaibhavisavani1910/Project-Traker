import { TestBed } from '@angular/core/testing';

import { GraphserviceService } from './graphservice.service';

describe('GraphserviceService', () => {
  let service: GraphserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
