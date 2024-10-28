import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DoctorsServiceService } from '../../services/doctors-service.service';
import { DoctorModel } from 'src/app/models/doctorModel';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-doctor',
  templateUrl: './add-edit-doctor.component.html',
  styleUrls: ['./add-edit-doctor.component.css']
})
export class AddEditDoctorComponent implements OnInit {

  items:any;
  editDoctorId!: number;
  isUpdateUser: boolean = false;

  constructor(public config: DynamicDialogConfig,
    private activatedRoute : ActivatedRoute) { 
      this.getQueryParams();
    }

  



  ngOnInit(): void {
      this.items = [
        {
            label: 'Personal',
            routerLink: 'dashboard/doctors/edit-doctor/personal'
        },
        {
            label: 'Experience',
            routerLink: 'dashboard/doctors/edit-doctor/experience'
        },
        {
            label: 'Education',
            routerLink: 'dashboard/doctors/edit-doctor/education'
        },
        {
          label: 'Service',
          routerLink: 'dashboard/doctors/edit-doctor/service'
      }
    ];

  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.editDoctorId = params['doctorId'];
        if (this.editDoctorId) {
          this.isUpdateUser = true;
        }
        else {
        this.isUpdateUser = false;
        }
      }
    }
    );
  }

}
