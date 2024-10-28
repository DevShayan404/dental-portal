import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorServiceFaresComponent } from './doctor-service-fares.component';

describe('DoctorServiceFaresComponent', () => {
  let component: DoctorServiceFaresComponent;
  let fixture: ComponentFixture<DoctorServiceFaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorServiceFaresComponent]
    });
    fixture = TestBed.createComponent(DoctorServiceFaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
