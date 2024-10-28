import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalLedgerComponent } from './hospital-ledger.component';

describe('HospitalLedgerComponent', () => {
  let component: HospitalLedgerComponent;
  let fixture: ComponentFixture<HospitalLedgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalLedgerComponent]
    });
    fixture = TestBed.createComponent(HospitalLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
