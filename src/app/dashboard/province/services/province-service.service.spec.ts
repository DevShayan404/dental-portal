import { TestBed } from '@angular/core/testing';

import { ProvinceServiceService } from './province-service.service';

describe('ProvinceServiceService', () => {
  let service: ProvinceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
