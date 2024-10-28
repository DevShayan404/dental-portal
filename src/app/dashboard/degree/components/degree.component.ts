import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DegreeServiceService } from '../services/degree-service.service';
import { AddEditDegreeComponent } from './add-edit-degree/add-edit-degree.component';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {
  JsonData : any;
  isLoading:boolean = false;
  DegreeId:number = 0;
  DegreeName:string = "";
  TotalCount:number=0;


  displayedColumns: string[] = ['Name','Action'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;

  constructor(private degreeService:DegreeServiceService,private messageService: MessageService,  private dialogService: DialogService) {
    this.getDegreeList();
   }

   ngOnInit(): void {
    this.degreeService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
      this.getDegreeList();
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDegreeList() {
    this.isLoading = true;
    this.degreeService.getAllDegrees().subscribe((response) => {
      if (response) {
        this.JsonData = response;
        this.TotalCount = this.JsonData.length;
        console.log(this.JsonData);
        this.dataSource = new MatTableDataSource(this.JsonData);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 1000);
      }
    });
  }

  handleAddEditDegree(row: any) {
    this.ref = this.dialogService.open(AddEditDegreeComponent, {
      data: { data: row },
      header: 'Degree', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  // handleDeleteDoctors(row:any){
  //   this.ref = this.dialogService.open(DeleteDynamicDialogComponent, {
  //     data: { data: row, urlPath: 'Degree/deleteDegree' },
  //     header: 'Delete Doctor', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
  //   });
  // }



  deleteDegree(id:number){
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
        this.degreeService.DeleteDegrees(id).subscribe((response:any) =>{
          if(response.Code == 1){
            console.log(" degree response",response)
            this.getDegreeList();
            this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
          }
        })
  
        }
      });

  }

}
