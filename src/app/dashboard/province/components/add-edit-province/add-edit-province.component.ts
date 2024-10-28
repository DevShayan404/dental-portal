import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProvinceServiceService } from '../../services/province-service.service';

@Component({
  selector: 'app-add-edit-province',
  templateUrl: './add-edit-province.component.html',
  styleUrls: ['./add-edit-province.component.css']
})
export class AddEditProvinceComponent implements OnInit {
  isUserUpdateBtn: boolean = false;
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private formBuilder: UntypedFormBuilder,
    private provinceService: ProvinceServiceService, private messageService: MessageService) { }

  provinceForm = this.formBuilder.group({
    Id: [''],
    Name: ['', Validators.required],
  })

  ngOnInit(): void {
    console.log("Config",this.config)
    let rowData = this.config?.data;
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.provinceForm.patchValue({
        Name: rowData?.data?.Name,
      });
      this.isUserUpdateBtn = true;

      if (this.provinceForm.invalid) {
        this.markAllControlsAsDirty();
      }
    }
    else {
      this.markAllControlsAsDirty();
      this.isUserUpdateBtn = false;
    }

  }

  
  markAllControlsAsDirty() {
    Object.values(this.provinceForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  createprovinceForm() {
    const provinceDataForm = this.provinceForm.getRawValue();
    // this.visible = false;

    if (provinceDataForm?.Id == '' || provinceDataForm?.Id == null) {
      const provinceDataModel: any = {
        Name: provinceDataForm?.Name,
      }
      if (this.provinceForm?.valid) {
        this.provinceForm.disabled;
        // this.provinceService.setisFormSubmittedDialog(true);
        // console.log("Province form",provinceDataModel)
        this.provinceService.AddProvince(provinceDataModel).subscribe((response: any) => {
          if (response) {
            this.provinceForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Province Created Successfully' });
            this.provinceService.setisFormSubmittedDialog(true);
          }
        })

      }
    }

    else {
      const provinceDataModel: any = {
        Name: provinceDataForm?.Name,
      }
      if (this.provinceForm?.valid) {
        this.provinceForm.disabled;
        this.provinceService.setisFormSubmittedDialog(true);
        this.provinceService.AddProvince(provinceDataModel).subscribe((response: any) => {
          if (response) {
            this.provinceForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
          }
        })

      }
    }


  }

}
