import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DegreeServiceService } from '../../services/degree-service.service';


@Component({
  selector: 'app-add-edit-degree',
  templateUrl: './add-edit-degree.component.html',
  styleUrls: ['./add-edit-degree.component.css']
})
export class AddEditDegreeComponent implements OnInit {

  isUserUpdateBtn: boolean = false;
  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder,
    private degreeService: DegreeServiceService, private messageService: MessageService) { }

  degreeForm = this.formBuilder.group({
    Id: [''],
    Name: ['', Validators.required],
  })

  ngOnInit(): void {
    let rowData = this.config?.data;
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.degreeForm.patchValue({
        Name: rowData?.data?.Name,
      });
      this.isUserUpdateBtn = true;

      if (this.degreeForm.invalid) {
        this.markAllControlsAsDirty();
      }
    }
    else {
    this.markAllControlsAsDirty();
      this.isUserUpdateBtn = false;
    }

  }

  markAllControlsAsDirty() {
    Object.values(this.degreeForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  createdegreeForm() {
    const degreeDataForm = this.degreeForm.getRawValue();
    // this.visible = false;

    if (degreeDataForm?.Id == '' || degreeDataForm?.Id == null) {
      const degreeDataModel: any = {
        Name: degreeDataForm?.Name,
      }
      if (this.degreeForm?.valid) {
        this.degreeForm.disabled;
        // this.degreeService.setisFormSubmittedDialog(true);
        this.degreeService.AddDegree(degreeDataModel).subscribe((response: any) => {
          if (response) {
            this.degreeForm.reset();
            this.degreeService.setisFormSubmittedDialog(true);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Degree Created Successfully' });
          }
        })

      }
    }

    else {
      const degreeDataModel: any = {
        Name: degreeDataForm?.Name,
      }
      if (this.degreeForm?.valid) {
        this.degreeForm.disabled;
        this.degreeService.setisFormSubmittedDialog(true);
        this.degreeService.AddDegree(degreeDataModel).subscribe((response) => {
          if (response) {
            this.degreeForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
          }
        })

      }
    }


  }


}
