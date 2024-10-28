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
  selector: 'app-hospital-percent-modaal',
  templateUrl: './hospital-percent-modaal.component.html',
  styleUrls: ['./hospital-percent-modaal.component.css']
})
export class HospitalPercentModaalComponent {
  closemessage = 'this is close message';
  inputdata: any;
  SetPercentForm!: FormGroup;
  LoginUSerObj: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private feeService: HospitalService,
    private ref: MatDialogRef<HospitalPercentModaalComponent>,
    private fb: FormBuilder,
    private cityService: CitiesServiceService,
    private vendorService: VendorserviceService,
    private messageService: MessageService
  ) {
    const x: string = localStorage.getItem('LoginUSer')!;
    this.LoginUSerObj = JSON.parse(window.atob(x));

    this.getAllCities();
    // this.GetfeeType();
  }

  // FeeType: any = [];
  // GetfeeType() {
  //   this.feeService.getFeeType().subscribe((response) => {
  //     this.FeeType = response.Result;
  //   });
  // }

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
    this.SetPercentForm = this.fb.group({
      vendorId: [null, Validators.required],
      amount: ['', Validators.required],
      percentage:['', Validators.required]
    });
    this.inputdata = this.data;

    if (this.inputdata.obj == 0) {
      this.ModalBtn = 'Add data';
      this.disbaleDropdownAtEdit = true;
    } 
    // else {
    //   this.ModalBtn = 'Update data';
    //   setTimeout(() => {
    //     this.SetFeeForm.patchValue(this.inputdata.obj);
    //   }, 300);
      
    // }
  }

  closepopup() {
    this.ref.close('closed');
  }
  savedata() {
    const loginUSerId = this.LoginUSerObj.nameid;
    if (this.inputdata.obj == 0) {
      const AddPercentObj = { ...this.SetPercentForm.value, id: 0 };
      // console.log(AddPercentObj)
      this.feeService
        .createVendorPercentage(loginUSerId,AddPercentObj)
        .subscribe((response) => {
          if (response?.IsSuccess) {
            console.log(response);
            this.SetPercentForm.reset();
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
    //  else {
    //   const Id = this.inputdata.obj.id;
    //   const EditFeeObj = { ...this.SetFeeForm.value, id: Id };

    //   this.feeService
    //     .updateHospitalFee(Id, loginUSerId, EditFeeObj)
    //     .subscribe((response) => {
    //       if (response?.IsSuccess) {
    //         this.closepopup();
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'success',
    //           detail: response?.Messages[0],
    //         });
    //       } else {
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error',
    //           detail: response?.ErrorMessages[0],
    //         });
    //       }
    //     });
    // }
  }
}
