import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalFollowupsComponent } from './hospital-followups.component';

describe('HospitalFollowupsComponent', () => {
  let component: HospitalFollowupsComponent;
  let fixture: ComponentFixture<HospitalFollowupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalFollowupsComponent]
    });
    fixture = TestBed.createComponent(HospitalFollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
