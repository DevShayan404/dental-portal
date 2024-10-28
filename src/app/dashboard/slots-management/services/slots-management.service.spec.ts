import { TestBed } from '@angular/core/testing';

import { SlotsManagementService } from './slots-management.service';

describe('SlotsManagementService', () => {
  let service: SlotsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
