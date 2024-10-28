import { Component } from '@angular/core';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  isTableLoading!: boolean ;
  isLoading: boolean = false;
  constructor(private patientService:PatientService, private cityService: CitiesServiceService,private messageService: MessageService,private vendorService:VendorserviceService){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  this.getAllCities();
  }


  
CitiesList:any
getAllCities(){
  this.cityService.getAllCities().subscribe((response:any) => {
    if (response?.IsSuccess) {
      this.CitiesList = response?.Result;
      // console.log("all cities", this.CitiesList)
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
    }
  })
}

cityId:any
changeCity(city:any){
  this.cityId = city
  this.getVendorsListByCityId(this.cityId);
  // console.log('change city',this.cityId)
}

vendorsListByCity:any
getVendorsListByCityId(cityId: number) {
  // this.isLoading = true;
  this.vendorService.getVendorsByCity(cityId).subscribe((response:any) => {
    if (response?.IsSuccess) {
      this.vendorsListByCity = response?.Result;
      // console.log("VendorListByCity",this.vendorsListByCity)

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      // this.isLoading = false;
    }
  })
}

VenderId!:number
PatientList:any=[]
PatientLength!:number
changeVendor(event:any){
  this.isTableLoading = true;
  this.VenderId = event;
  this.patientService.getVPatientDetailByVendorId(this.VenderId).subscribe((response)=>{
    this.isTableLoading = false;
    if (response?.IsSuccess) {
      this.PatientList = response?.Result;
      this.PatientLength = this.PatientList.length;
      console.log("PatientList",this.PatientList)
      if(this.PatientList.length == 0){
     alert(this.PatientList.length)
       this.messageService.add({ severity: 'info', summary: 'info', detail: 'No data' });
      }

    }
    else {
     
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
    }
        })
}




ArrowIndex!:number
ResetAppointment(i:number){
  this.ArrowIndex = i;
this.appointmentDetail = [];
this.Pindex =null;
}

appointmentDetail:any = []
AppointmentLength:any;
Pindex =null;
Sid:any = null;
getPatientAppointment(PatientId:number,StatusId:number,index:any){
  this.Pindex = index;
  this.Sid = StatusId;
  const vendorId = this.VenderId;
  const patientId = PatientId;
  const VisitSTtaus = StatusId;
  console.log(this.VenderId,PatientId,StatusId);

  if(this.ArrowIndex == this.Pindex){
    this.patientService.getpatientAppointment(patientId,VisitSTtaus,vendorId).subscribe(response =>{
   
      if (response?.IsSuccess) {
        this.appointmentDetail  = response?.Result;
        this.AppointmentLength = this.appointmentDetail.length;
        console.log("ApppointmentList",this.appointmentDetail);
        if(this.appointmentDetail.length == 0){
       
         this.messageService.add({ severity: 'info', summary: 'info', detail: 'No data' });
        }
  
      }
      else {
       
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
  
    })
  }else{
    this.messageService.add({ severity: 'error', summary: 'Error', detail:'Click on arrow first' });

  }

 
}



}
