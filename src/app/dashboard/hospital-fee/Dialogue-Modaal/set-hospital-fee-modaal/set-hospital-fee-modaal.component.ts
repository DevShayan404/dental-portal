import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { MessageService } from 'primeng/api';
import { HospitalService } from '../../service/hospital.service';
@Component({
  selector: 'app-set-hospital-fee-modaal',
  templateUrl: './set-hospital-fee-modaal.component.html',
  styleUrls: ['./set-hospital-fee-modaal.component.css'],
})
export class SetHospitalFeeModaalComponent {
  closemessage = 'this is close message';
  inputdata: any;
  SetFeeForm!: FormGroup;
  LoginUSerObj: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private feeService: HospitalService,
    private ref: MatDialogRef<SetHospitalFeeModaalComponent>,
    private fb: FormBuilder,
    private cityService: CitiesServiceService,
    private vendorService: VendorserviceService,
    private messageService: MessageService
  ) {
    const x: string = localStorage.getItem('LoginUSer')!;
    this.LoginUSerObj = JSON.parse(window.atob(x));

    this.getAllCities();
    this.GetfeeType();
  }

  FeeType: any = [];
  GetfeeType() {
    this.feeService.getFeeType().subscribe((response) => {
      this.FeeType = response.Result;
    });
  }

  CitiesList: any;
  getAllCities() {
    this.cityService.getAllCities().subscribe((response: any) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.ErrorMessages[0],
        });
      }
    });
  }

  cityId: any;
  changeCity(city: any) {
    this.cityId = city;
    this.getVendorsListByCityId(this.cityId);
  }

  vendorsListByCity: any;
  getVendorsListByCityId(cityId: number) {
    this.vendorService.getVendorsByCity(cityId).subscribe((response: any) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.ErrorMessages[0],
        });
      }
    });
  }

  ModalBtn: any;
  disbaleDropdownAtEdit!: boolean;
  ngOnInit(): void {
    this.SetFeeForm = this.fb.group({
      feesTypeId: [null, Validators.required],
      vendorId: [null, Validators.required],
      amount: ['', Validators.required],
    });
    this.inputdata = this.data;
    // console.log("checkInput",this.inputdata)

    if (this.inputdata.obj == 0) {
      this.ModalBtn = 'Add data';
      this.disbaleDropdownAtEdit = true;
    } else {
      this.ModalBtn = 'Update data';
      setTimeout(() => {
        this.SetFeeForm.patchValue(this.inputdata.obj);
      }, 300);
      
    }
  }

  closepopup() {
    this.ref.close('closed');
  }
  savedata() {
    const loginUSerId = this.LoginUSerObj.nameid;
    if (this.inputdata.obj == 0) {
      const AddFeeObj = { ...this.SetFeeForm.value, id: 0 };
      this.feeService
        .addHospitalFee(loginUSerId, AddFeeObj)
        .subscribe((response) => {
          if (response?.IsSuccess) {
            this.SetFeeForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: response?.Messages[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.ErrorMessages[0],
            });
          }
        });
    } else {
      const Id = this.inputdata.obj.id;
      const EditFeeObj = { ...this.SetFeeForm.value, id: Id };

      this.feeService
        .updateHospitalFee(Id, loginUSerId, EditFeeObj)
        .subscribe((response) => {
          if (response?.IsSuccess) {
            this.closepopup();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: response?.Messages[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.ErrorMessages[0],
            });
          }
        });
    }
  }
}
