import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ServiceApisService } from '../../services/service-apis.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.css']
})
export class AddEditServiceComponent implements OnInit {

  isUserUpdateBtn: boolean = false;
  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder,
    private allServiceApi: ServiceApisService, private messageService: MessageService) { }

  serviceForm = this.formBuilder.group({
    Id: [''],
    Name: ['', Validators.required],
  })

  ServiceId!:number
  ngOnInit(): void {
    let rowData = this.config?.data;
    this.ServiceId = rowData.data.ServiceId;
    console.log(rowData,this.ServiceId)
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.serviceForm.patchValue({
        Id:rowData?.data?.ServiceId,
        Name: rowData?.data?.Name,
      });
      this.isUserUpdateBtn = true;

      if (this.serviceForm.invalid) {
        this.markAllControlsAsDirty();
      }
    }
    else {
      this.markAllControlsAsDirty();
      this.isUserUpdateBtn = false;
    }

  }

  markAllControlsAsDirty() {
    Object.values(this.serviceForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }


  createServiceForm() {
    const serviceDataForm = this.serviceForm.getRawValue();
    // this.visible = false;
// console.log("serviceDataForm",serviceDataForm)
    if (serviceDataForm?.Id == '' || serviceDataForm?.Id == null) {
      const serviceDataModel: any = {
        Name: serviceDataForm?.Name,
      }

      if (this.serviceForm?.valid) {
  
        this.serviceForm.disabled;
        // this.allServiceApi.setisFormSubmittedDialog(true);
        console.log(serviceDataModel)
        this.allServiceApi.AddService(serviceDataModel).subscribe((response: ResponseModel) => {
          console.log("Post",response)
          if (response?.IsSuccess) {
            this.serviceForm.reset();
            this.allServiceApi.setisFormSubmittedDialog(true);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
          }
        })

      }
    }

    else {
      const serviceDataModel: any = {
        Name: serviceDataForm?.Name,
        Fees: serviceDataForm?.Fees,
        ServiceId: this.ServiceId,
      }
      if (this.serviceForm?.valid) {
        this.serviceForm.disabled;
        // this.allServiceApi.setisFormSubmittedDialog(true);
        console.log(serviceDataModel)
        this.allServiceApi.updateService(serviceDataModel).subscribe((response:ResponseModel) => {
          console.log("Update",response)
          if (response?.IsSuccess) {
            this.serviceForm.reset();
            this.allServiceApi.setisFormSubmittedDialog(true);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
          }
        })

      }
    }


  }



}
