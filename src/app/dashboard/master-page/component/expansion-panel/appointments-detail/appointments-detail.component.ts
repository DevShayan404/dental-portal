import { Component } from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
@Component({
  selector: 'app-appointments-detail',
  templateUrl: './appointments-detail.component.html',
  styleUrls: ['./appointments-detail.component.css']
})
export class AppointmentsDetailComponent {
  constructor(private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService){}

  VendorId!:number
  ngOnInit(): void {
   
      this.subjectService.GetVendorId().subscribe((vendor:number) =>{
        this.VendorId = vendor;
        if(this.VendorId > 0){
        this.getAppointmentsList(this.VendorId);
      }
        console.log("from subject",this.VendorId)
           })

  }


  isTableLoading:boolean=true;
  AppointmentsList:any=[]
  AppointmentsListLength:any
  getAppointmentsList(vendor:number){
    this.Masterservice.getAppointmentsByVendorId(vendor).subscribe(response=>{
      this.AppointmentsList = response?.Result;
      this.isTableLoading = false;
      // this.AppointmentsListLength = this.AppointmentsList.length;
      console.log("Appoitnments list",this.AppointmentsList);
    })
  }
  
}
