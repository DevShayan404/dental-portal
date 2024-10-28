import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelPatientComponent } from './expansion-panel-patient.component';

describe('ExpansionPanelPatientComponent', () => {
  let component: ExpansionPanelPatientComponent;
  let fixture: ComponentFixture<ExpansionPanelPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpansionPanelPatientComponent]
    });
    fixture = TestBed.createComponent(ExpansionPanelPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
