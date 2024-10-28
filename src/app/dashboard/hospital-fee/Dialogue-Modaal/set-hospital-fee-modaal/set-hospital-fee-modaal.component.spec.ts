import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHospitalFeeModaalComponent } from './set-hospital-fee-modaal.component';

describe('SetHospitalFeeModaalComponent', () => {
  let component: SetHospitalFeeModaalComponent;
  let fixture: ComponentFixture<SetHospitalFeeModaalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetHospitalFeeModaalComponent]
    });
    fixture = TestBed.createComponent(SetHospitalFeeModaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
