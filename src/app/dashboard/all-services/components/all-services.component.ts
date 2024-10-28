import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddEditServiceComponent } from './add-edit-service/add-edit-service.component';
import { ServiceApisService } from '../services/service-apis.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {

  JsonData: any;
  isLoading: boolean = false;
  ServiceId: number = 0;
  ServiceName: string = "";
  TotalCount: number = 0;
  UpdateServiceName: string = "";
  isUpdateModal: boolean = false;

  displayedColumns: string[] = ['Name', 'Actions'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;

  constructor(private allServiceApi: ServiceApisService, private dialogService: DialogService, private messageService: MessageService) {
    this.getAllServiceList();
  }

  ngOnInit(): void {
    this.allServiceApi.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
      this.getAllServiceList();
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllServiceList() {
    this.isLoading = true;
    this.allServiceApi.getAllServices().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.JsonData = response?.Result;
        this.TotalCount = this.JsonData?.length;
        console.log(this.JsonData);
        this.dataSource = new MatTableDataSource(this.JsonData);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 1000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  handleAddEditService(row: any) {
    // console.log("edit service",row)
    this.ref = this.dialogService.open(AddEditServiceComponent, {
      data: { data: row },
      header: 'Services', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteService(id:number){
    console.log('delete', id);
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
        this.allServiceApi.DeleteService(id).subscribe((response:any) =>{
          if(response.Code == 1){
            this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });

            this.getAllServiceList();
          }
        })
  
        }
      });

  }


}
