import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteDynamicDialogComponent } from 'src/app/modules/delete-dynamic-dialog/delete-dynamic-dialog.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorModel } from 'src/app/models/doctorModel';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-view-doctor-list',
  templateUrl: './view-doctor-list.component.html',
  styleUrls: ['./view-doctor-list.component.css']
})
export class ViewDoctorListComponent implements OnInit {


  isTableLoading: boolean = false;
  isLoading: boolean = false;
  doctorId: any;
  userId: any;
  displayedColumns: string[] = ['FullName', 'Number', 'Email', 'Gender', 'Fees', 'Actions'];
  dataSource!: MatTableDataSource<DoctorModel>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  ref!: DynamicDialogRef;

  adminRole: any = ['Admin']
  operationRole: any = ['Operation']
  hospitalRole: any = ['VendorSuperUser']
  PartnerRole: any = ['Partner']
  cityModel: any;
  doctorModel: any;
  allDoctorList: any;
  CitiesList: any;
  enableDoctorItem: boolean = true;
  enableHospitalItem: boolean = true;
  hospitalModel: any;
  vendorsListByCity: any;



  constructor(private vendorService: VendorserviceService, private cityService: CitiesServiceService,
    private authService: AuthenticationService, private router: Router,
    private messageService: MessageService, private dialogService: DialogService,
  ) {

    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
  }

  async ngOnInit() {
    this.getAllCities();

    const result = await this.authService.decodeTokenFromLocalStorage() as UserModel;
    if (result.role === 'VendorSuperUser') {
      this.getAllDoctorListByHospital(this.userId);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllDoctorListByHospital(hospitalId: number) {
    this.isTableLoading = true;
    this.isLoading = true;
    this.vendorService.getDoctorListByVendorId(hospitalId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.allDoctorList = response?.Result[0]?.DoctorVendor.map((item:any)=> {return item?.Doctor});
        this.dataSource = new MatTableDataSource<any>(this.allDoctorList);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => {
          this.isLoading = false;
          this.isTableLoading = false;
        }, 2000);

      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    })
  }

  handleAddDoctor() {
    this.router.navigate(['dashboard/doctors/edit-doctor/personal']);
  }

  handleEditDoctorInfo(row: any, path: string) {
    this.router.navigate([`dashboard/doctors/edit-doctor/${path}`], { queryParams: { doctorId: row?.Id } });
  }

  handleViewDoctorInfo(row: any) {
    this.router.navigate([`dashboard/view-profile`], { queryParams: { doctorId: row?.Id } });
  }


  handleDeleteDoctors(row: any) {
    // console.log("dr delete ",row)
    this.ref = this.dialogService.open(DeleteDynamicDialogComponent, {
      data: { data: row },
      // data: { data: row, urlPath: 'DoctorSlot/DeleteDoctorSlot' },
      header: 'Delete Doctor', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  getAllCities() {
    this.isTableLoading = true;
    this.isLoading = true;
    this.cityService.getAllCities().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
        this.isLoading = false;
        this.isTableLoading = false;

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoading = false;
      }
    })
  }

  changeCityForHospitals(value: any) {
    this.hospitalModel = undefined;
    this.getHospitalListByCityId(value.Id);
    this.enableHospitalItem = false;
  }


  getHospitalListByCityId(cityId: number) {
    this.isTableLoading = true;
    this.isLoading = true;
    this.vendorService.getVendorsByCity(cityId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
        setTimeout(() => {
          this.isTableLoading = false;
          this.isLoading = false;
        }, 2000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isTableLoading = false;
        this.isLoading = false;
      }
    })
  }

  handleDoctorsFilterByAdmin() {
    if (this.cityModel && this.hospitalModel) {
      this.getAllDoctorListByHospital(this.hospitalModel.Id);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });

    }
  }



}
