import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { UserService } from '../../services/user.service';
import { UserOperationModel } from 'src/app/models/userOperationModel.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {


  isUserUpdateBtn: boolean = false;
  isLoading: boolean = false;

  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder,
    private userService: UserService, private messageService: MessageService) { }

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', Validators.required],
  })


  ngOnInit(): void {

    let rowData = this.config?.data;
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.userForm.patchValue({
        name: rowData?.data?.name,
        email: rowData?.data?.email,
        contact: rowData?.data?.contact
      });
      this.isUserUpdateBtn = true;
      if (this.userForm.invalid) {
        // this.markAllControlsAsDirty();
      }
    }
    else {
      this.isUserUpdateBtn = false;
      // this.markAllControlsAsDirty();
    }

  }

  markAllControlsClearValidation() {
    Object.values(this.userForm.controls).forEach((control: AbstractControl) => {
      control.clearValidators();
    });
  }

  markAllControlsAsDirty() {
    Object.values(this.userForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  validateControls(controllerName: string, error: string) {
    return (this.userForm.get(controllerName)?.hasError(error));
  }

  createUserForm() {
    const userDataForm: UserOperationModel = this.userForm.getRawValue();
    if (userDataForm?.id == undefined || userDataForm?.id == null) {
      const userDataModel: UserOperationModel = {
        name: userDataForm?.name,
        email: userDataForm?.email,
        contact: userDataForm?.contact
      }
      if (this.userForm?.valid) {
        this.userForm.disabled;
        this.userService.addUserOperation(userDataModel).subscribe((response: ResponseModel) => {
          this.userService.setisFormSubmittedDialog(true);
          if (response?.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
          }
        })

      }
    }

    // else {
    //   const userDataModel: SlotModel = {
    //     doctorId: userDataForm?.doctorId,
    //     doctorVendorId: userDataForm?.doctorVendorId,
    //     shiftId: userDataForm?.shiftId,
    //     time: userDataForm?.shiftId
    //   }
    //   if (this.userForm?.valid) {
    //     this.userForm.disabled;
    //     this.slotService.setisFormSubmittedDialog(true);
    //     this.slotService.addSlot(userDataModel).subscribe((response: ResponseModel) => {
    //       if (response) {
    //         this.userForm.reset();
    //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
    //       }
    //     })

    //   }
    // }
  }


}
