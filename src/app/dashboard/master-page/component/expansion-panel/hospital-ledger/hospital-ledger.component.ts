import { Component } from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-hospital-ledger',
  templateUrl: './hospital-ledger.component.html',
  styleUrls: ['./hospital-ledger.component.css']
})
export class HospitalLedgerComponent {
  StatusList: any = [ { id: 1, name: 'Visit' },{ id: 0, name: 'Not visit' }];
  constructor( private messageService:MessageService, private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService){
  }

  VendorId!:number
  ngOnInit(): void {
   
      this.subjectService.GetVendorId().subscribe((vendor:number) =>{
        this.VendorId = vendor;
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
  
  Status:any
  changeStatus(status:any){
    this.Status = status;
  }


  AllLedger:any=[];
  isTableLoading!:boolean
  SearchLedger(){
    this.isTableLoading = true;
  const start = this.DateFormate(this.dateRange.value.start);
   const end = this.DateFormate(this.dateRange.value.end);
  if(start != '' && end != '' && this.Status != undefined){
this.Masterservice.GetcalculateLedger(this.VendorId,start,end,this.Status).subscribe(data=>{
    console.log("AllLed",data)
    if(data.Count >0){
      const ledger =  data?.Result[0].LedgerResult;
      this.AllLedger = [ledger];
      this.isTableLoading = false;
    }else{
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'data not found'});
      this.isTableLoading = false;
    }
 
 
})
  }else{
    this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enter All Fields'});

  }

  }
}
