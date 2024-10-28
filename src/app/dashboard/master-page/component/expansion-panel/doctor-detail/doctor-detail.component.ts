import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
  showlogo:boolean=true;
  constructor(private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService){
  }



  VendorId!:number
  ngOnInit(): void {
   
      this.subjectService.GetVendorId().subscribe((vendor:number) =>{
        this.VendorId = vendor;
        if(this.VendorId > 0){
        this.getDoctorList(this.VendorId);
      }
        console.log("from subject",this.VendorId)
           })

  

   this.dateRange.get('end')?.valueChanges.subscribe((endDate)=>{
    const start = this.DateFormate(this.dateRange.value.start);
    const end = this.DateFormate( endDate);
    this.Masterservice.getDoctorledger(this.doctorId,start,end).subscribe((data:any) =>{
      console.log("After date range",data);
      this.doctorBasicInfo = data?.Result.Doctor;
      this.DoctorAppointments = data?.Result.Appointments;
     })
})
  }

AllDoctorList:any=[]
DoctorListLength:any
getDoctorList(vendor:number){
  this.Masterservice.getDoctorListByVendorId(vendor).subscribe(response=>{
    this.AllDoctorList = response?.Result;
    this.DoctorListLength = this.AllDoctorList.length;
    console.log("Doctor list",this.AllDoctorList);
  })
}

dateRange = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

formatedDate:any
DateFormate(date:any){
  if(date == null){
    return "";
  }else{
    var year = date.getFullYear();
    let day = date.getDate();
    var month = date.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    this.formatedDate = `${year}-${month}-${day}`;
    return this.formatedDate;
  }
 
}

doctorBasicInfo:any
DoctorAppointments:any
doctorId!:number
isTableLoading:boolean = true
DoctorLedger(data:any){
  this.isTableLoading = true;
  this.doctorId = data.DoctorId;
    const start = '';
    const end = '';
 this.Masterservice.getDoctorledger(this.doctorId,start,end).subscribe(data =>{
  this.dateRange.reset();
  this.showlogo = false;
  this.isTableLoading = false;
  this.doctorBasicInfo = data?.Result.Doctor;
  this.DoctorAppointments = data?.Result.Appointments;
 })
}



}
