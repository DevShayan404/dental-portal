import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCostComponent } from './financial-cost.component';

describe('FinancialCostComponent', () => {
  let component: FinancialCostComponent;
  let fixture: ComponentFixture<FinancialCostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialCostComponent]
    });
    fixture = TestBed.createComponent(FinancialCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
