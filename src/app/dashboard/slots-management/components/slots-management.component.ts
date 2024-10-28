import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteDynamicDialogComponent } from 'src/app/modules/delete-dynamic-dialog/delete-dynamic-dialog.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { AddEditSlotsComponent } from './add-edit-slots/add-edit-slots.component';
import { VendorserviceService } from '../../vendor/services/vendorservice.service';
import { SlotsManagementService } from '../services/slots-management.service';
import { DatePipe } from '@angular/common';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorModel } from 'src/app/models/doctorModel';
import { CitiesServiceService } from '../../cities/services/cities-service.service';
import { DoctorsServiceService } from '../../doctors/services/doctors-service.service';

@Component({
  selector: 'app-slots-management',
  templateUrl: './slots-management.component.html',
  styleUrls: ['./slots-management.component.css']
})
export class SlotsManagementComponent implements OnInit {


  CitiesList: any;
  isLoading: boolean = true;
  slotList: any;
  doctorId: any;
  displayedColumns: string[] = ['Vendor', 'DayOfWeek', 'StartTimeGet', 'EndTimeGet', 'Shift', 'IntervalinMints'];
  dataSource!: MatTableDataSource<DoctorModel>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  ref!: DynamicDialogRef;
  vendorsListByCity: any;
  doctorVendorModel: any;

  cityModel: any;
  doctorModel: any;
  adminRole: any = ['Admin']
  doctorRole: any = ['Doctor']
  doctorsList: any;
  isTableLoading: boolean = true;
  enableDoctorItem: boolean = true;
  enableHospitalItem: boolean = true;



  WeekList: any = [{ id: 1, name: 'Sunday' }, { id: 2, name: 'Monday' }, { id: 3, name: 'Tuesday' }, { id: 4, name: 'Wednesday' }, { id: 5, name: 'Thursday' },
  { id: 6, name: 'Friday' }, { id: 7, name: 'Saturday' }];

  constructor(private vendorService: VendorserviceService,
    private slotService: SlotsManagementService, private datePipe: DatePipe,
    private messageService: MessageService, private dialogService: DialogService,
    private cityService: CitiesServiceService, private doctorService: DoctorsServiceService) {

    this.doctorId = UtilHelpers.getDoctorId();
    if (!this.doctorId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
  }

  ngOnInit(): void {
    this.getVendorsListByDoctorId(this.doctorId);
    this.getAllCities();
    this.slotService.getisFormSubmittedDialog().subscribe((response: any) => {
      this.ref?.close();
      // if (this.doctorVendorModel) {
      //   this.getAllSlotsList(this.doctorVendorModel);
      // }
    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleSlotsFilterByAdmin() {
    if (this.CitiesList && this.doctorModel && this.doctorVendorModel) {
      
      this.getAllSlotsList(this.doctorModel?.Id);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });

    }
  }

  handleSlotsFilterByDoctor() {
    if (this.doctorVendorModel) {
      this.getAllSlotsList(this.doctorVendorModel?.DoctorVendorId);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });
    }
  }

  getAllCities() {
    this.cityService.getAllCities().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
        this.isLoading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoading = false;
      }
    })
  }

  handleSlotByVendorId(event: any) {
    this.getAllSlotsList(event);
  }

  changeCityForHospitals(value: any) {
    this.doctorVendorModel = undefined;
    this.getVendorsListByCityId(value.Id);
    this.enableHospitalItem = false;
  }


  changeHospitalForDoctor(value: any) {
    this.doctorModel = undefined;
    // this.getVendorsListByDoctorId(value?.Id);
    this.getAllDoctorsListByVendor(value.Id);
    this.enableDoctorItem = false;
  }

  getAllDoctorsListByCity(cityId: number) {
    this.isLoading = true;
    this.doctorService.GetAllDoctorsByCity(cityId).subscribe((response: ResponseModel) => {
      if (response) {
        this.doctorsList = response;
        this.doctorsList.map((item: any) => item.fullName = item?.InitialName + ' ' + item?.FirstName + ' ' + item?.LastName)
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });

      }
    });
  }

  getAllDoctorsListByVendor(vendorId: number) {
    this.isLoading = true;
    this.vendorService.getDoctorListByVendorId(vendorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorsList = response.Result;
        this.doctorsList = this.doctorsList[0]?.DoctorVendor;
        this.doctorsList.map((item: any) => {
          item.fullName = item?.Doctor?.InitialName + ' ' + item?.Doctor?.FirstName + ' ' + item?.Doctor?.LastName
        })
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    });
  }



  getVendorsListByDoctorId(doctorId: number) {

    this.isLoading = true;
    this.vendorService.getVendorsByDoctorId(doctorId).subscribe((response: ResponseModel) => {
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

  getVendorsListByCityId(cityId: number) {
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

  getAllSlotsList(doctorVendorId: number) {
    this.isTableLoading = true;
    this.slotService.getSlots(doctorVendorId).subscribe((response: ResponseModel) => {
      if (response.IsSuccess) {
        this.slotList = response?.Result;
        if (this.slotList?.length > 0) {
          this.slotList = this.slotList.map((x: any) => {
            const matchingWeek = this.WeekList.find((y: any) => x.DayOfWeek === y.id);
            if (matchingWeek) { x.Day = matchingWeek.name; }
            return x;
          });
          this.dataSource = new MatTableDataSource<any>(this.slotList);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
          setTimeout(() => {
            this.isTableLoading = false;
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Records not Found..' });
          this.slotList = [];
          this.dataSource = new MatTableDataSource<any>(this.slotList);
          setTimeout(() => {
            this.isTableLoading = false;
          }, 2000);
        }

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isTableLoading = false;
      }
    })
  }


  handleAddEditSlots(row: any) {
    this.ref = this.dialogService.open(AddEditSlotsComponent, {
      data: { data: row },
      header: 'Slots', width: '60%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  handleDeleteDoctors(row: any) {
    this.ref = this.dialogService.open(DeleteDynamicDialogComponent, {
      data: { data: row },
      header: 'Delete Doctor', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }



}
