import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppointmentsService } from '../../../services/appointments.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-add-edit-follow-up',
  templateUrl: './add-edit-follow-up.component.html',
  styleUrls: ['./add-edit-follow-up.component.css']
})
export class AddEditFollowUpComponent implements OnInit {

  constructor(private messageService: MessageService, private appointmentService: AppointmentsService,
    private formBuilder: UntypedFormBuilder, public config: DynamicDialogConfig, private authService: AuthenticationService) { }

  visitedStatusModel: any;
  doctorCallStatusModel: any;
  patientCallStatusModel: any;

  visitedStatusList: any = [{ id: 0, name: 'Non-Visited' }, { id: 1, name: 'Visited' }];
  doctorCallStatusList: any = [{ id: 0, name: 'Pending' }, { id: 1, name: 'Done' }];
  patientCallStatusList: any = [{ id: 0, name: 'Pending' }, { id: 1, name: 'Done' }];
  updatedById:any;
  updatedRole:any;

  ref!: DynamicDialogRef;

  appointmentForm = this.formBuilder.group({
    id: [''],
    visitStatus: ['', Validators.required],
    finalFees: ['', Validators.required],
    updatedBy: [''],
    updatedRole: [''],
    doctorCallStatus: ['', Validators.required],
    patientCallStatus: ['', Validators.required],
    patientremarks:['', Validators.required]


  })

 async ngOnInit() {
    // this.appointmentService.getisFormSubmittedDialog().subscribe((response: any) => {
    //   debugger
    //   this.ref?.close();
    // })

    const result = await this.authService.decodeTokenFromLocalStorage() as UserModel;
    this.updatedById = result?.nameid;
    this.updatedRole = result?.role!;

    let rowData = this.config?.data;
    // console.log("data",this.config?.data);
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.appointmentForm.patchValue({
        id: rowData?.data?.Id,
        visitStatus: rowData?.data?.VisitStatus,
        finalFees: rowData?.data?.PatientFinalFees,
        doctorCallStatus: rowData?.data?.DoctorCallStatus,
        patientCallStatus: rowData?.data?.PatientCallStatus,
        patientremarks:rowData?.data?.PatientRemarks
      });
      this.visitedStatusModel = this.visitedStatusList?.find((x: any) => x.id === rowData?.data?.VisitStatus);
      this.doctorCallStatusModel = this.doctorCallStatusList?.find((x: any) => x.id === rowData?.data?.DoctorCallStatus);
      this.patientCallStatusModel = this.patientCallStatusList?.find((x: any) => x.id === rowData?.data?.PatientCallStatus);
    }
  }



  handleUpdateAppointmentDetailsByOpteration() {
    const appointmentDataForm = this.appointmentForm.getRawValue();
    // this.visible = false;

    if (appointmentDataForm?.id != undefined || appointmentDataForm?.id != null) {
      const appointmentDataModel = {
        id: appointmentDataForm?.id,
        visitStatus: appointmentDataForm?.visitStatus?.id,
        patientFinalFees: appointmentDataForm?.finalFees,
        updatedBy: this.updatedById,
        updatedRole: this.updatedRole,
        doctorCallStatus: appointmentDataForm?.doctorCallStatus?.id,
        patientCallStatus: appointmentDataForm?.patientCallStatus?.id,
        patientRemarks:appointmentDataForm?.patientremarks
      }
    //  console.log("obj",appointmentDataModel)
      if (this.appointmentForm?.valid) {
        this.appointmentForm.disabled;
        this.appointmentService.setisFormSubmittedDialog(true);
        this.appointmentService.putAppointmentByOperation(appointmentDataModel).subscribe((response: ResponseModel) => {
          if (response?.IsSuccess) {
            this.appointmentService.setisFormSubmittedDialog(true);
            this.appointmentForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0]});
          }
          else{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.ErrorMessages[0]});

          }
        })
  
      }

      else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Something went wrong'});

      }
    }
   
  }


}
