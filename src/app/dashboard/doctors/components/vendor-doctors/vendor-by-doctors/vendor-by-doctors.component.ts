import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AddEditVendorDoctorComponent } from '../add-edit-vendor-doctor/add-edit-vendor-doctor.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';

@Component({
  selector: 'app-vendor-by-doctors',
  templateUrl: './vendor-by-doctors.component.html',
  styleUrls: ['./vendor-by-doctors.component.css']
})
export class VendorByDoctorsComponent implements OnInit {
  isLoading:boolean = true;
  displayedColumns: string[] = ['BusinessName', 'Address1', 'Address2', 'City', 'Lat', 'Long', 'Status', 'Actions'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;
  vendorDoctorList: any;
  doctorItem: any;
  doctorName: any;
  doctorId: any;


  constructor(private doctorService: DoctorsServiceService, private activatedRoute: ActivatedRoute,
    private dialogService: DialogService, private location: Location,
    private vendorService: VendorserviceService, public router: Router,
    private messageService: MessageService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.doctorId = params['doctorId'];
      this.getVendorListByDoctorId(this.doctorId);
      this.getDoctorById(this.doctorId);
    }) 
  }

  isParentRouteActive() : boolean {
    return this.router.isActive(`/dashboard/doctors/doctor-vendor/${this.doctorId}`,true);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getVendorListByDoctorId(doctorId: number) {
    this.isLoading = true;
    this.vendorService.getVendorsByDoctorId(doctorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.vendorDoctorList = response?.Result;
        this.dataSource = new MatTableDataSource(this.vendorDoctorList);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 2000);
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }
    });
  }

  getDoctorById(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorItem = response?.Result;
        this.doctorName = this.doctorItem?.InitialName + ' ' + this.doctorItem?.FirstName + ' ' + this.doctorItem?.LastName;
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  backToDoctorListPage(){
    this.location.back();
  }

  handleAddEditVendorDoctor(row: any) {
    this.ref = this.dialogService.open(AddEditVendorDoctorComponent, {
      data: { data: row },
      header: 'Degree', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

}
