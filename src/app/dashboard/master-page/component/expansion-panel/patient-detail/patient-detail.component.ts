import { Component, OnInit} from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  showlogo:boolean=true;
  constructor(private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService){
  }

  VendorId!:number
  ngOnInit(): void {
   
      this.subjectService.GetVendorId().subscribe((vendor:number) =>{
        this.VendorId = vendor;
        if(this.VendorId > 0){
        this.getPatientList(this.VendorId);
      }
        console.log("from subject",this.VendorId)
           })


  }

AllPatientList:any=[]
PatientListLength:any
getPatientList(vendor:number){
  this.Masterservice.getPatientListByVendorId(vendor).subscribe(response=>{
    this.AllPatientList = response?.Result;
    this.PatientListLength = this.AllPatientList.length;
    // console.log("Patient list",this.AllPatientList);
  })
}



PatientBasicInfo:any
PatientAppointments:any
doctorId!:number
isTableLoading:boolean = true
PatientLedger(data:any){
  // console.log("List data",data);
  this.isTableLoading = true;
  this.PatientBasicInfo = data;
const vendorId = this.VendorId;
const patientId = data.PatientId;
 this.Masterservice.getPateintDetail(patientId,vendorId).subscribe(data =>{
  this.showlogo = false;
  this.isTableLoading = false;
  // console.log("Table data",data);
  this.PatientAppointments = data?.Result;
 })
}
}
