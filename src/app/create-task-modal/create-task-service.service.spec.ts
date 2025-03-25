import { TestBed } from '@angular/core/testing';

import { CreateTaskServiceService } from './create-task-service.service';

describe('CreateTaskServiceService', () => {
  let service: CreateTaskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTaskServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
