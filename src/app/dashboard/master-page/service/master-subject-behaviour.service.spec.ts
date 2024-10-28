import { TestBed } from '@angular/core/testing';

import { MasterSubjectBehaviourService } from './master-subject-behaviour.service';

describe('MasterSubjectBehaviourService', () => {
  let service: MasterSubjectBehaviourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSubjectBehaviourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
