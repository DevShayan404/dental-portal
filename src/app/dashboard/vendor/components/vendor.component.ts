import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VendorserviceService } from '../services/vendorservice.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { CitiesServiceService } from '../../cities/services/cities-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  citiesList:any;
  AllVendorArray:any;
  cityid:any;
  isLoading:boolean = false;
  isTableLoading: boolean = false;
  VendorsList: any;
  cityModel: any;
  //hide 3 columns [ 'Address2', 'Lat', 'Long']
  displayedColumns: string[] = ['BusinessName', 'Address1','City', 'Email', 'Status', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;

  constructor(private vendorService:VendorserviceService, private router: Router,
    private messageService: MessageService, private cityService: CitiesServiceService, private dialogService: DialogService) {
    this.getAllCitiesList();
  }

  ngOnInit(): void {
    this.vendorService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
    })
  }



  filterbyStatus(){

  }

  getAllCitiesList(){
    this.cityService.getAllCities().subscribe((response: ResponseModel)=>{
      if (response?.IsSuccess) {
        this.citiesList = response?.Result;
        // this.getAllVendorsListByCity(this.citiesList[0].Id);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataLength:any
  getAllVendorsListByCity(cityId: number){
    this.statusModel = '';
    // console.log("cityId",cityId)
    this.isLoading = true;
    this.isTableLoading = true;
    this.vendorService.getVendorsDetailByCity(cityId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.VendorsList = response?.Result;
        this.AllForFilter = response?.Result;
        this.dataSource = new MatTableDataSource(this.VendorsList);
        this.dataLength = this.dataSource.filteredData.length;
        this.getFilterLists(this.VendorsList);
        // console.log("dataTable",this.VendorsList )
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; this.isTableLoading = false; }, 1000);

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  statusList:any;
getFilterLists(list:any){
  const uniqueStatusNames = [...new Set(list.map((status:any) => status.UserStatus?.Status))];
  this.statusList = uniqueStatusNames;
//  console.log("status list",this.statusList)
}



// statusModel:any;
// changeStatus(event:any){
// console.log(event)
// }

filterStatus:any;
AllForFilter:any;
statusModel:any
changeStatus(statusVal:any){
  // console.log("statusVal",statusVal);
  this.VendorsList =  this.AllForFilter;
  this.filterStatus = statusVal;

  const filteredTickets = this.VendorsList.filter((status:any) => {
    return (
      (status.UserStatus?.Status === this.filterStatus) 
    );
  });

this.VendorsList = filteredTickets;
    this.dataSource = new MatTableDataSource<any>(this.VendorsList);
  this.dataSource.paginator = this.paginator;
  this.dataLength = this.dataSource.filteredData.length;

}

  handleAddHospital() {
    this.router.navigate(['dashboard/hospital/edit-hospital/info']);
  }

  handleEditHospitalInfo(row: any) {
    this.router.navigate([`dashboard/hospital/edit-hospital/info`], { queryParams: { hospitalId: row?.Id } });
  }

  handleEditHospitaltiming(row: any) {
    this.router.navigate([`dashboard/hospital/edit-hospital/office-timing`], { queryParams: { hospitalId: row?.Id } });
  }

  handleViewHospitalInfo(row: any) {
    this.router.navigate([`dashboard/hospital/view-hospital-profile`], { queryParams: { hospitalId: row?.Id } });
  }


  handleHospitalFilterByCity() {
    // console.log(this.cityModel)
    if (this.cityModel) {
      this.getAllVendorsListByCity(this.cityModel?.Id);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });
    }
  }

}
