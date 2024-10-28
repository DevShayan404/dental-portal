import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalFeeComponent } from './hospital-fee.component';

describe('HospitalFeeComponent', () => {
  let component: HospitalFeeComponent;
  let fixture: ComponentFixture<HospitalFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalFeeComponent]
    });
    fixture = TestBed.createComponent(HospitalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
