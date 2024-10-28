import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DoctorsServiceService } from '../../../services/doctors-service.service';


@Component({
  selector: 'app-add-edit-service-vendor-doctor',
  templateUrl: './add-edit-service-vendor-doctor.component.html',
  styleUrls: ['./add-edit-service-vendor-doctor.component.css']
})
export class AddEditServiceVendorDoctorComponent implements OnInit {

  isUserUpdateBtn: boolean = false;
  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder,
    private doctorService: DoctorsServiceService, private messageService: MessageService) { }

  vendorDoctorForm = this.formBuilder.group({
    Id: [''],
    Name: ['', Validators.required],
  })

  ngOnInit(): void {
    let rowData = this.config?.data;
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.vendorDoctorForm.patchValue({
        Name: rowData?.data?.Name,
      });
      this.isUserUpdateBtn = true;

      if (this.vendorDoctorForm.invalid) {
        this.markAllControlsAsDirty();
      }
    }
    else {
     this.markAllControlsAsDirty();
      this.isUserUpdateBtn = false;
    }

  }

  markAllControlsAsDirty() {
    Object.values(this.vendorDoctorForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  createvendorDoctorForm() {
    const degreeDataForm = this.vendorDoctorForm.getRawValue();
    // this.visible = false;

    if (degreeDataForm?.Id == '' || degreeDataForm?.Id == null) {
      const vendorDoctorDataModel: any = {
        Name: degreeDataForm?.Name,
      }
      if (this.vendorDoctorForm?.valid) {
        this.vendorDoctorForm.disabled;
        this.doctorService.setisFormSubmittedDialog(true);
        this.doctorService.AddDoctor(vendorDoctorDataModel).subscribe((response: any) => {
          if (response) {
            this.vendorDoctorForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Created Successfully' });
          }
        })

      }
    }

    else {
      const vendorDoctorDataModel: any = {
        Name: degreeDataForm?.Name,
      }
      if (this.vendorDoctorForm?.valid) {
        this.vendorDoctorForm.disabled;
        this.doctorService.setisFormSubmittedDialog(true);
        this.doctorService.AddDoctor(vendorDoctorDataModel).subscribe((response) => {
          if (response) {
            this.vendorDoctorForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
          }
        })

      }
    }


  }
}
