import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CitiesServiceService } from '../services/cities-service.service';
import { AddEditCitiesComponent } from './add-edit-cities/add-edit-cities.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  JsonData: any;
  isLoading: boolean = false;
  CityId: number = 0;
  CityName: string = "";
  TotalCount: number = 0;

  displayedColumns: string[] = ['Name','Action'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;
  citiesList: any;

  constructor(private citiesService: CitiesServiceService,private messageService: MessageService,  private dialogService: DialogService) {
    this.getCitiesList();
  }

  ngOnInit(): void {
    this.citiesService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
      this.getCitiesList();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCitiesList() {
    this.isLoading = true;
    this.citiesService.getAllCities().subscribe((response: ResponseModel) => {
      console.log("city list", response)
      if (response?.IsSuccess) {
        this.citiesList = response?.Result;
        this.dataSource = new MatTableDataSource(this.citiesList);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 1000);

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }

    });
  }

  handleAddEditCities(row: any) {
    this.ref = this.dialogService.open(AddEditCitiesComponent, {
      data: { data: row },
      header: 'Cities', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }



  deleteCity(id:number){
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
        this.citiesService.DeleteCIty(id).subscribe((response:any) =>{
          if(response.Code == 1){
            this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });

            this.getCitiesList();
          }
        })
  
        }
      });

  }

}
