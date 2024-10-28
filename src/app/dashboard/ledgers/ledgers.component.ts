import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, } from '@angular/forms';
import { LedgerService } from './service/ledger.service';
import { VendorserviceService } from '../vendor/services/vendorservice.service';
import { CitiesServiceService } from '../cities/services/cities-service.service';
import { MessageService } from 'primeng/api';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-ledgers',
  templateUrl: './ledgers.component.html',
  styleUrls: ['./ledgers.component.css']
})
export class LedgersComponent {

  basicInfo!: FormGroup;
  hospitalTotal!:FormGroup;
  isTableLoading!: boolean ;
  isLoading: boolean = false;
  visitStatusList: any = [{ id: 0, name: 'Non-Visited' }, { id: 1, name: 'Visited' }]
  constructor(private fb: FormBuilder,private LedgerService:LedgerService,private cityService: CitiesServiceService,private vendorService:VendorserviceService,private messageService: MessageService){
this.getAllCities();
  }

  visitStatus:any
  changeStatus(visit:any){
    this.visitStatus = visit;
console.log(this.visitStatus)
  }

  CitiesList:any
  selectedCities:any;
  cityModel:any
  getAllCities() {
    this.cityService.getAllCities().subscribe((response:any) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
        console.log("all cities", this.CitiesList)
        // this.isLoading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        // this.isLoading = false;
      }
    })
  }

  cityId:any
  changeCity(city:any){
    this.cityId = city.Id
    this.getVendorsListByCityId(this.cityId)
    console.log('change city',this.cityId)
  }

  vendorsListByCity:any
  selectedVendor:any
  getVendorsListByCityId(cityId: number) {
    // this.isLoading = true;
    this.vendorService.getVendorsByCity(cityId).subscribe((response:any) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
        console.log(this.vendorsListByCity)
        // setTimeout(() => {
        //   this.isTableLoading = false;
        //   this.isLoading = false;
        // }, 2000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        // this.isLoading = false;
      }
    })
  }

  vendorId:any
  changevendor(vendor:any){
this.vendorId = vendor.Id;
console.log(this.vendorId);
  }


  formatedDate:any
DateFormate(date:any){
  var year = date.getFullYear();
  let day = date.getDate();
  var month = date.getMonth() + 1;
  if (month <= 9) month = '0' + month;
  this.formatedDate = `${year}-${month}-${day}`;
  return this.formatedDate;
}

//   date:any
//   changedatepicker(event: MatDatepickerInputEvent<Date>){
// this.date = event.value;
// this.DateFormate(event.value)
// console.log("date",this.formatedDate);
//   }

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  FinalLedgerReport:any
  totalLedgerAmount:any = []
  showTotalLedger:any
  SearchLedger(){
    const start = this.DateFormate(this.dateRange.value.start);
    const end = this.DateFormate( this.dateRange.value.end);

    console.log("start",start,end);


    this.totalLedgerAmount = [];
    this.showTotalLedger = [];

    if(this.vendorId == undefined  || end == undefined || this.visitStatus == undefined || this.cityId == undefined){
      this.messageService.add({ severity: 'error', summary: 'Error', detail:'please select value' });
      
    }
else{
  this.LedgerService.getLedger(this.vendorId,start,end,this.visitStatus).subscribe((response)=>{
    this.isTableLoading = true;
    if (response?.IsSuccess) {
      this.isTableLoading = false;
      this.FinalLedgerReport = response?.Result;
      console.log("finalLedgerReport",this.FinalLedgerReport)
     this.FinalLedgerReport.map((val:any)=>{
      const total = val.LedgerResult.FinalLedgerAmount;
      this.totalLedgerAmount.push(total);
     })
      const reducer = (accumulator:any, curr:any) => accumulator + curr;
      this.showTotalLedger = this.totalLedgerAmount.reduce(reducer);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
    }
    else {
      this.isTableLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
    }
        })
}
   
  }


}




// this.basicInfo = this.fb.group({
//   CityName: ['', Validators.required],
//   VendorName: ['', Validators.required],
//   Appointment: ['', Validators.required],
//   InitialFees: ['', Validators.required],
//   FinalLedgerAmount: ['', Validators.required],
//   PatientFinalFees: ['', Validators.required],
//   PercentOfAmount: ['', Validators.required],
//   Amount: ['', Validators.required],
//   Percentage: ['', Validators.required],
// });
// this.hospitalTotal= this.fb.group({
//   Amount: ['', Validators.required],
//   Percentage: ['', Validators.required],
// });