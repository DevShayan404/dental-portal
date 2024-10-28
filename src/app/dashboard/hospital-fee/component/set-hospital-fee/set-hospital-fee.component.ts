import { Component,ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import {MatDialog} from '@angular/material/dialog';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { HospitalService } from '../../service/hospital.service';
import { SetHospitalFeeModaalComponent } from '../../Dialogue-Modaal/set-hospital-fee-modaal/set-hospital-fee-modaal.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-set-hospital-fee',
  templateUrl: './set-hospital-fee.component.html',
  styleUrls: ['./set-hospital-fee.component.css']
})
export class SetHospitalFeeComponent {
  isTableLoading!: boolean ;
  isLoading: boolean = false;  
constructor(public dialog: MatDialog,private messageService: MessageService,private cityService: CitiesServiceService,private vendorService:VendorserviceService,private hospitalService:HospitalService){
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
  VendorList:any=[]
  changeVendor(event:any){
    this.isTableLoading = true;
    this.VenderId = event;
    this.hospitalService.getVendorFeesByVendorId(this.VenderId).subscribe((response)=>{
      this.isTableLoading = false;
      if (response?.IsSuccess) {
        this.VendorList = response?.Result;
        if(this.VendorList.length == 0){
       
         this.messageService.add({ severity: 'info', summary: 'info', detail: 'No data' });
        }
        console.log("aLL LIST",this.VendorList)

      }
      else {
       
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
          })
  }


  
  deleteHospitalRow(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteVendorFees(id).subscribe(response =>{
          if(response.Code == 1){
            this.changeVendor(this.VenderId)
            this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
          }
        })
  
        }
      });

  }




setTitle!:string
  AddNew(val:number){
    //0 for add
    this.setTitle = 'Add New appointment Fee'
    this.Openpopup(val)
  }

  EditFee(element:any){
    // console.log("element",element)
    //1 for edit
    this.setTitle = 'Edit appointment Fee';
    const obj = {
      id:element.Id,
      feesTypeId:element.FeeType.Id,
      vendorId:element.vendorId,
      amount:element.Amount
    }
    this.Openpopup(obj)
  }

  Openpopup(val:any){
    var _popup =  this.dialog.open(SetHospitalFeeModaalComponent,{
 width:'40%',
 disableClose: true,
//  height:'400px',
//  enterAnimationDuration:'500ms',
//  exitAnimationDuration:'500ms',
 data:{title: this.setTitle,obj:val}
     });
     _popup.afterClosed().subscribe(item=>{
   
      this.changeVendor(this.VenderId);
      //  console.log(item)
       //we can refresh our function here eg:this.getdata()
     })
   }

}
