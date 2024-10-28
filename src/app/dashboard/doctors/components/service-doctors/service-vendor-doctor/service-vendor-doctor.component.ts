import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AddEditServiceVendorDoctorComponent } from '../add-edit-service-vendor-doctor/add-edit-service-vendor-doctor.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-service-vendor-doctor',
  templateUrl: './service-vendor-doctor.component.html',
  styleUrls: ['./service-vendor-doctor.component.css']
})
export class ServiceVendorDoctorComponent implements OnInit {

  isLoading: boolean = true;
  displayedColumns: string[] = ['Name', 'Fees', 'Discount', 'FixedPercentage', 'Actions'];
  dataSource!: MatTableDataSource<{}>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  ref!: DynamicDialogRef;
  vendorDoctorList: any;
  doctorId!: number;
  vendorId!: number;
  notFound: boolean = false;
  doctorItem: any;
  doctorName!: string;

  constructor(private doctorService: DoctorsServiceService, private activatedRoute: ActivatedRoute,
    private location: Location, private dialogService: DialogService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.doctorId = +this.activatedRoute.parent?.snapshot.paramMap.get('doctorId')!;
    this.vendorId = +this.activatedRoute.snapshot.paramMap.get('vendorId')!;
    this.getAllServiceByDoctorVendorId(this.doctorId, this.vendorId);
    this.getDoctorById(this.doctorId);
  }

  getAllServiceByDoctorVendorId(doctorId: number, vendorId: number) {
    this.isLoading = true;
    this.doctorService.getAllServiceByDoctorVendorId(doctorId, vendorId).subscribe((response: ResponseModel) => {
      if (response.IsSuccess) {
        this.vendorDoctorList = response?.Result;
        this.dataSource = new MatTableDataSource(this.vendorDoctorList);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => { this.isLoading = false; }, 2000);
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        setTimeout(() => { this.isLoading = false; }, 2000);

      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  backToDoctorListPage() {
    this.location.back();
  }

  handleAddEditVendorServiceDoctor(row: any) {
    this.ref = this.dialogService.open(AddEditServiceVendorDoctorComponent, {
      data: { data: row },
      header: 'Services by Vendor', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
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
}
