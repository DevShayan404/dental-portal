import { TestBed } from '@angular/core/testing';

import { DoctorsServiceService } from './doctors-service.service';

describe('DoctorsServiceService', () => {
  let service: DoctorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
