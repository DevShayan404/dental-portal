import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CitiesServiceService } from '../../services/cities-service.service';
import { CityModel } from 'src/app/models/cityModel';

@Component({
  selector: 'app-add-edit-cities',
  templateUrl: './add-edit-cities.component.html',
  styleUrls: ['./add-edit-cities.component.css']
})
export class AddEditCitiesComponent implements OnInit {


  isUserUpdateBtn: boolean = false;
  
  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder,
    private citiesService: CitiesServiceService, private messageService: MessageService) { }

  cityForm = this.formBuilder.group({
    Id: [''],
    name: ['', Validators.required],
  })

  ngOnInit(): void {
    let rowData = this.config?.data;
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {
      this.cityForm.patchValue({
        name: rowData?.data?.name,
      });
      this.isUserUpdateBtn = true;

      if (this.cityForm.invalid) {
        this.markAllControlsAsDirty();
      }
    }
    else {
      this.markAllControlsAsDirty();
      this.isUserUpdateBtn = false;
    }

  }

  markAllControlsAsDirty() {
    Object.values(this.cityForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  createCityForm() {
    const cityDataForm : CityModel = this.cityForm.getRawValue();
    // this.visible = false;

    if (cityDataForm?.id == undefined || cityDataForm?.id == null) {
      const cityDataModel: CityModel = {
        name: cityDataForm?.name,
      }
      if (this.cityForm?.valid) {
        this.cityForm.disabled;
        // this.citiesService.setisFormSubmittedDialog(true);
        this.citiesService.AddCity(cityDataModel).subscribe((response: any) => {
          if (response) {
            this.cityForm.reset();
            this.citiesService.setisFormSubmittedDialog(true);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'City Created Successfully' });
          }
        })

      }
    }

    else {
      const cityDataModel: CityModel = {
        name: cityDataForm?.name,
      }
      if (this.cityForm?.valid) {
        this.cityForm.disabled;
        this.citiesService.setisFormSubmittedDialog(true);
        this.citiesService.AddCity(cityDataModel).subscribe((response) => {
          if (response) {
            this.cityForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
          }
        })

      }
    }


  }

}
