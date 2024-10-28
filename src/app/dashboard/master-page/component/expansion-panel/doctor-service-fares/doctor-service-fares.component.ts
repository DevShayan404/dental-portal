import { Component, inject } from '@angular/core';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
import { MasterService } from '../../../service/master.service';

@Component({
  selector: 'app-doctor-service-fares',
  templateUrl: './doctor-service-fares.component.html',
  styleUrls: ['./doctor-service-fares.component.css'],
})
export class DoctorServiceFaresComponent {
  doctorServicesFeesList!: any[];
  constructor(
    private readonly subjectService: MasterSubjectBehaviourService,
    private readonly service: MasterService
  ) {}

  ngOnInit(): void {
    this.subjectService.GetVendorId().subscribe({
      next: (res) => {
        this.service.getDoctorServicesFees(res).subscribe({
          next: (res) => {
            this.doctorServicesFeesList = res;
          },
        });
      },
    });
  }
}
