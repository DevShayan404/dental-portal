import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProvinceServiceService } from '../services/province-service.service';
import { AddEditProvinceComponent } from './add-edit-province/add-edit-province.component';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {

  JsonData : any;
  isLoading:boolean = false;
  ProvinceId:number = 0;
  ProvinceName:string = "";
  TotalCount:number=0;

  displayedColumns: string[] = ['Name','Action'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;
  constructor(private provinceService:ProvinceServiceService,private messageService: MessageService, private dialogService: DialogService) {
    this.getProvinceList();
   }

   ngOnInit(): void {
    this.provinceService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
      this.getProvinceList();
    })
  }

  GetAllProvince(){
    this.provinceService.GetAllProvinceNew().subscribe((res)=>{
      this.JsonData = res;
      this.TotalCount = this.JsonData.length;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProvinceList() {
    this.isLoading = true;
    this.provinceService.GetAllProvinceNew().subscribe((response) => {
      if (response) {
        this.JsonData = response;
        this.TotalCount = this.JsonData.length;
        // console.log(this.JsonData);
        this.dataSource = new MatTableDataSource(this.JsonData);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 1000);
      }
    });
  }

  handleAddEditProvince(row: any) {
    this.ref = this.dialogService.open(AddEditProvinceComponent, {
      data: { data: row },
      header: 'Province', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
//     this.ref.onClose.subscribe((response: any) => {
// console.log("response",response)
//       this.getProvinceList();
//   });
  }


  deleteProvince(id:number){
    console.log(id)
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
        this.provinceService.DeleteProvince(id).subscribe((response:any) =>{
        
          if(response.Code == 1){
            this.getProvinceList();
            this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
          }
        })
  
        }
      });

  }
}
