import { Component } from '@angular/core';
import { VendorserviceService } from '../../../services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { MessageService } from 'primeng/api';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { FormBuilder } from '@angular/forms';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
@Component({
  selector: 'app-hospital-followups',
  templateUrl: './hospital-followups.component.html',
  styleUrls: ['./hospital-followups.component.css']
})
export class HospitalFollowupsComponent {
  CitiesList: any;
  cityModel: any;
  doctorVendorModel: any;
  enableHospitalItem: boolean = true;
  isLoading: boolean = true;
  vendorsListByCity: any;
  isTableLoading: boolean = false;
  enableDoctorItem: boolean = true;
  panelOpenState = false;
  reamrksForm = this.fb.group({
    remarks: '',
  });

  LoginUserId:any
constructor(private fb: FormBuilder,private vendorService:VendorserviceService,private cityService: CitiesServiceService,private messageService: MessageService,){
  this.getAllCities();
  this.LoginUserId =  UtilHelpers.getDoctorId();
  console.log("loginusr",this.LoginUserId)

}



getAllCities() {
  this.cityService.getAllCities().subscribe((response: ResponseModel) => {
    if (response?.IsSuccess) {
      this.CitiesList = response?.Result;
      // console.log("cityList",this.CitiesList)
      this.isLoading = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      this.isLoading = false;
    }
  })
}




cityID:any
changeCityForHospitals(value: any) {
  this.doctorVendorModel = undefined;
  this.cityID = value.Id
  this.getVendorsListByCityId(value.Id);
  this.enableHospitalItem = false;
}
getVendorsListByCityId(cityId: number) {
  this.isLoading = true;
  this.vendorService.getVendorsByCity(cityId).subscribe((response: ResponseModel) => {
    if (response?.IsSuccess) {
      this.vendorsListByCity = response?.Result;
      // setTimeout(() => {
      //   this.isTableLoading = false;
      //   this.isLoading = false;
      // }, 2000);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      this.isTableLoading = false;
      this.isLoading = false;
    }
  })
}
hospitalID:any
changeHospitalForDoctor(value: any) {
  // this.doctorModel = undefined;
const id = value.Id;
this.hospitalID = id
  // this.getAllDoctorsListByVendor(value.Id);
  // this.enableDoctorItem = false;
}




RemarksList:any
GetRemarks(){
  this.isTableLoading = true;
  this.vendorService.gethospitalRemarks(this.hospitalID).subscribe((data:any) =>{
    this.RemarksList = data.Result;
          setTimeout(() => {
        this.isTableLoading = false;
        this.isLoading = false;
      }, 2000);
// console.log("Remarks",this.RemarksList)
  })
}

CreatedDate = new Date();
AddVendorRemarks(){
  // console.log("remarks",this.reamrksForm.value.remarks)
  // console.log("City ID",this.cityID)
  // console.log("vendor ID",this.hospitalID)
  // console.log("created on",this.CreatedDate)
  // console.log("loginid",this.LoginUserId)

const remarksObj = {
  "vendorId": this.hospitalID,
  "remarks": this.reamrksForm.value.remarks,
  "operationsId": this.LoginUserId,
  "cityId":this.cityID,
  "createdOn": this.CreatedDate
}
console.log(remarksObj);

this.vendorService.postHospitalRemarks(remarksObj).subscribe((response:any) => {

if (response?.IsSuccess) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
  this.reamrksForm.reset();
  this.GetRemarks();
}
else {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
}
})


}
}
