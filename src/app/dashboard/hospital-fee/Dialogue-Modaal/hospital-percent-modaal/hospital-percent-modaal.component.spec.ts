import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPercentModaalComponent } from './hospital-percent-modaal.component';

describe('HospitalPercentModaalComponent', () => {
  let component: HospitalPercentModaalComponent;
  let fixture: ComponentFixture<HospitalPercentModaalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalPercentModaalComponent]
    });
    fixture = TestBed.createComponent(HospitalPercentModaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
