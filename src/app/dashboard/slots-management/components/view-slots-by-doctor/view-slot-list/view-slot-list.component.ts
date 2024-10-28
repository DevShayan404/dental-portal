import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteDynamicDialogComponent } from 'src/app/modules/delete-dynamic-dialog/delete-dynamic-dialog.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorModel } from 'src/app/models/doctorModel';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { SlotsManagementService } from '../../../services/slots-management.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { DoctorsServiceService } from 'src/app/dashboard/doctors/services/doctors-service.service';
import { AddEditSlotsComponent } from '../../add-edit-slots/add-edit-slots.component';

@Component({
  selector: 'app-view-slot-list',
  templateUrl: './view-slot-list.component.html',
  styleUrls: ['./view-slot-list.component.css']
})
export class ViewSlotListComponent implements OnInit {


  CitiesList: any;
  isLoading: boolean = true;
  slotList: any;
  doctorId: any;
  displayedColumns: string[] = ['DayOfWeek', 'StartTimeGet', 'EndTimeGet', 'Shift', 'IntervalinMints', 'Actions'];
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
  operationRole: any = ['Operation']
  hospitalRole: any = ['VendorSuperUser']
  PartnerRole: any = ['Partner']
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
    this.getAllDoctorListByHospital(this.doctorId);
    this.slotService.getisFormSubmittedDialog().subscribe((response: any) => {
      this.ref?.close();
      // if (this.doctorVendorModel) {
      //   this.getAllSlotsList(this.doctorVendorModel);
      this.getAllSlotsList(this.doctorModel?.Id);
      // alert(this.doctorModel?.Id)
      // }
    })
    
    this.getAllCities();


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  handleSlotsFilterByDoctor() {
    if (this.doctorModel) {
      this.getAllSlotsList(this.doctorModel?.Id);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });
    }
  }


  getAllDoctorListByHospital(vendorId: number) {
    this.isLoading = true;
    this.vendorService.getDoctorListByVendorId(vendorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorsList = response.Result;
        this.doctorsList = this.doctorsList[0]?.DoctorVendor;
        this.doctorsList?.map((item: any) => {
          item.fullName = item?.Doctor?.InitialName + ' ' + item?.Doctor?.FirstName + ' ' + item?.Doctor?.LastName
        })
        this.isLoading = false;
        this.isTableLoading = false;
      }
      else {
        this.isLoading = false;
        this.isTableLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    });
  }





  getAllSlotsList(doctorVendorId: number) {
    this.isTableLoading = true;
    this.slotService.getSlots(doctorVendorId).subscribe((response: ResponseModel) => {
      if (response.IsSuccess) {
        this.slotList = response?.Result;
        console.log("slotlist",this.slotList)
        if (this.slotList?.length > 0) {
          this.slotList = this.slotList?.map((x: any) => {
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
    let slotheader;
    if(row == 0){
      slotheader = 'Create Slot'
    }else{
      slotheader = 'Update Slot'
    }
    this.ref = this.dialogService.open(AddEditSlotsComponent, {
      data: { data: row },
      header: slotheader, width: '60%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  handleDeleteDoctors(row: any) {
    // console.log('Delete slote',row)
    this.ref = this.dialogService.open(DeleteDynamicDialogComponent, {
      data: { data: row, urlPath: 'DoctorSlot/DeleteDoctorSlot' },
      header: 'Delete Doctor', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
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

  changeCityForHospitals(value: any) {
    this.doctorVendorModel = undefined;
    this.getHospitalListByCityId(value.Id);
    this.enableHospitalItem = false;
  }


  getHospitalListByCityId(cityId: number) {
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

  changeHospitalForDoctor(value: any) {
    this.doctorModel = undefined;
    this.getAllDoctorListByHospital(value.Id);
    this.enableDoctorItem = false;
  }

  handleSlotsFilterByAdmin() {
    if (this.CitiesList && this.doctorModel && this.doctorVendorModel) {

      this.getAllSlotsList(this.doctorModel?.Id);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });

    }
  }




}
