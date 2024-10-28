import { TestBed } from '@angular/core/testing';

import { ServiceApisService } from './service-apis.service';

describe('ServiceApisService', () => {
  let service: ServiceApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
