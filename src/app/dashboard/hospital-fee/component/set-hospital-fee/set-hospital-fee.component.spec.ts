import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHospitalFeeComponent } from './set-hospital-fee.component';

describe('SetHospitalFeeComponent', () => {
  let component: SetHospitalFeeComponent;
  let fixture: ComponentFixture<SetHospitalFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetHospitalFeeComponent]
    });
    fixture = TestBed.createComponent(SetHospitalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
