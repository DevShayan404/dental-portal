import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPercentageComponent } from './hospital-percentage.component';

describe('HospitalPercentageComponent', () => {
  let component: HospitalPercentageComponent;
  let fixture: ComponentFixture<HospitalPercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalPercentageComponent]
    });
    fixture = TestBed.createComponent(HospitalPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
