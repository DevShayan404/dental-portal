import { Component } from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
import { MessageService } from 'primeng/api';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentModalComponent } from '../../../dialogue-modaal/appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-patient-appoitments',
  templateUrl: './patient-appoitments.component.html',
  styleUrls: ['./patient-appoitments.component.css']
})
export class PatientAppoitmentsComponent {
  constructor(public dialog: MatDialog,private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService, private messageService: MessageService){}

  PatientId!:number
  ngOnInit(): void {
   
      this.subjectService.GetPatientId().subscribe((Id:number) =>{
        this.PatientId = Id;
        if(this.PatientId > 0){
          this.toggleStatus = 1;
        this.getAppointmentsList(this.PatientId);
      }
        console.log("from subject patient",this.PatientId)
           })

  }


  isTableLoading:boolean=true;
  AppointmentsList:any=[]
  AppointmentsListLength:any;
  toggleStatus!:number;
  getAppointmentsList(Patient:number){
    this.isTableLoading = true;
console.log("toggle",this.toggleStatus)
    this.Masterservice.getPateintAppointmentDetail(Patient,this.toggleStatus).subscribe(response=>{
      this.AppointmentsList = response?.Result;
      if(this.AppointmentsList.length == 0){
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'No data found'});
        this.isTableLoading = false;
      }
      this.isTableLoading = false;
      // this.AppointmentsListLength = this.AppointmentsList.length;
      console.log("Appoitnments list for patients",this.AppointmentsList);
    })
  }
  


  setTitle!:string;
  Openpopup(){
    this.setTitle =  'Add new Appointment';
    var _popup =  this.dialog.open(AppointmentModalComponent,{
 width:'100%',
 disableClose: true,
//  height:'400px',
//  enterAnimationDuration:'500ms',
//  exitAnimationDuration:'500ms',

 data:{title: this.setTitle}
     });
     _popup.afterClosed().subscribe(item=>{
      this.getAppointmentsList(this.PatientId)
     })
   }



  TSindex = null;
  pastAppointment(one: any) {
this.TSindex = one;
this.toggleStatus = 1;
this.getAppointmentsList(this.PatientId)
}

futureAppointment(two: any) {
  this.TSindex = two;
  this.toggleStatus = 2;
  this.getAppointmentsList(this.PatientId);
  }
}
