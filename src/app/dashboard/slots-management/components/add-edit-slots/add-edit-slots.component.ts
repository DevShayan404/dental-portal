import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SlotModel } from 'src/app/models/slotModel.interface';
import { SlotsManagementService } from '../../services/slots-management.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { DatePipe } from '@angular/common';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorsServiceService } from 'src/app/dashboard/doctors/services/doctors-service.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';

@Component({
  selector: 'app-add-edit-slots',
  templateUrl: './add-edit-slots.component.html',
  styleUrls: ['./add-edit-slots.component.css']
})
export class AddEditSlotsComponent implements OnInit {

  isUserUpdateBtn: boolean = false;
  isLoading: boolean = false;
  vendorList!: any;
  shiftList: any;
  startTransformedDate!: string | null;
  endTransformDate!: string | null;
  doctorId: any;
  isListRendered: boolean = false;
  vendorsByDoctorList: any;
  doctorVendorModel: any;
  cityModel: any;
  doctorModel: any;
  doctorsList: any;
  CitiesList: any;
  enableDoctorItem: boolean = true;
  adminRole: any = ['Admin']
  operationRole: any = ['Operation']
  hospitalRole: any = ['VendorSuperUser']
  TimeFormat: any = [{ id: 1, format: 'AM' }, { id: 2, format: 'PM' }];
  WeekList: any = [{ id: 1, name: 'Sunday' }, { id: 2, name: 'Monday' }, { id: 3, name: 'Tuesday' }, { id: 4, name: 'Wednesday' }, { id: 5, name: 'Thursday' },
  { id: 6, name: 'Friday' }, { id: 7, name: 'Saturday' }];
  IntervalList: any = [{ id: 1, name: '15 minutes', desc: 15 }, { id: 2, name: '30 minutes', desc: 30 }, { id: 3, name: '60 minutes', desc: 60 }];
  enableHospitalItem: boolean = true;
  vendorsListByCity: any;

  constructor(public config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder, private datePipe: DatePipe,
    private slotService: SlotsManagementService, private vendorService: VendorserviceService,
    private doctorService: DoctorsServiceService, private cityService: CitiesServiceService, private messageService: MessageService) {

    this.doctorId = UtilHelpers.getDoctorId();
    if (!this.doctorId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }

  }

  slotForm = this.formBuilder.group({
    cityId: [''],
    hospitalId: [''],
    doctorId: [''],
    shiftId: ['', Validators.required],
    dayOfWeek: ['', Validators.required],
    doctorVendorId: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    intervalinMints: ['', Validators.required]
  })



  rowId!:number;
  drvendorId!:number;
  ngOnInit(): void {

    // this.getAllVendorsListByDoctor(this.doctorId);
    this.getAllDoctorListByHospital(this.doctorId);
    this.getAllShiftList();
    this.getAllCities();
    // this.validateAllListRender();

    let rowData = this.config?.data;
    console.log("RowData",rowData.data);
    this.rowId = rowData.data.Id;
    this.drvendorId = rowData.data.DoctorVendorId;
    const startTimeString = rowData?.data?.StartTimeGet; 
    const endTimeString = rowData?.data?.EndTimeGet;
    const startTime = this.convertTimeStringToDate(startTimeString);
const endTime = this.convertTimeStringToDate(endTimeString);
    if (rowData?.data !== '' && rowData?.data !== null && rowData?.data !== 0) {

      this.slotForm.patchValue({
        doctorVendorId: rowData?.data?.DoctorVendorId,
        shiftId: rowData?.data?.ShiftId,
        dayOfWeek:rowData?.data?.DayOfWeek,
        startTime: startTime,
        endTime:endTime, 
        intervalinMints:rowData?.data?.IntervalinMints        
      });
      console.log("slit form",this.slotForm);

      this.isUserUpdateBtn = true;
      if (this.slotForm.invalid) {
        // this.markAllControlsAsDirty();
      }
    }
    else {
      this.isUserUpdateBtn = false;
      // this.markAllControlsAsDirty();
    }

  }


  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }

  markAllControlsClearValidation() {
    Object.values(this.slotForm.controls).forEach((control: AbstractControl) => {
      control.clearValidators();
    });
  }

  markAllControlsAsDirty() {
    Object.values(this.slotForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }

  getAllVendorsListByDoctor(doctorId: number) {
    this.isLoading = true;
    this.vendorService.getVendorsByDoctorId(doctorId).subscribe((response: ResponseModel) => {

      if (response?.IsSuccess) {
        this.vendorList = response?.Result;
        this.isLoading = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  getAllShiftList() {
    this.isLoading = true;
    this.slotService.getAllShifts().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.shiftList = response?.Result;
        this.isLoading = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  async createslotForm() {

    const slotDataForm = this.slotForm.getRawValue();
    this.startTransformedDate = await this.TimeValidate(slotDataForm?.startTime!);
    this.endTransformDate = await this.TimeValidate(slotDataForm?.endTime!);

    if (this.rowId == undefined || this.rowId == null) {
      // alert('create')
      const slotDataModel: SlotModel = {

        dayOfWeek: slotDataForm?.dayOfWeek,
        doctorVendorId: slotDataForm?.doctorVendorId?.Id,
        shiftId: slotDataForm?.shiftId,
        startTime: this.startTransformedDate!,
        endTime: this.endTransformDate!,
        intervalinMints: slotDataForm?.intervalinMints
      }
      if (this.slotForm?.valid) {
        this.slotForm.disabled;
        console.log("slotDataModel",slotDataModel)
        this.slotService.addSlot(slotDataModel).subscribe((response: ResponseModel) => {
          console.log("response",response)
          this.slotService.setisFormSubmittedDialog(true);
          if (response?.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
          }
        })

      }
    }

    else {
      // alert('update')
      const slotDataForm = this.slotForm.getRawValue();
      this.startTransformedDate = await this.TimeValidate(slotDataForm?.startTime!);
      this.endTransformDate = await this.TimeValidate(slotDataForm?.endTime!);
    const slotObj =   {
        "id": this.rowId,
        "doctorVendorId":this.drvendorId,
        "dayOfWeek": slotDataForm?.dayOfWeek,
        "startTime":this.startTransformedDate!,
        "endTime": this.endTransformDate!,
        "intervalinMints": slotDataForm?.intervalinMints,
        "shiftId": slotDataForm?.shiftId,
        "startTimeGet": "",
        "endTimeGet": "",
        "vendor": "",
        "shift": {
          "id": 0,
          "type": ""
        },
        "cityName": ""
      }
      // console.log("slotDataModel",slotObj);

      if (slotObj) {
        this.slotForm.disabled;
        // this.slotService.setisFormSubmittedDialog(true);
        this.slotService.updateSlot(slotObj).subscribe((response: ResponseModel) => {
          // console.log("response",response)
          if (response) {
            this.slotService.setisFormSubmittedDialog(true);
            this.slotForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Slot Updated Successfully' });
          }
        })
      }
    }


  }

  async TimeValidate(time: string) {
    const startTime: string = time;
    const parsedDate = new Date(startTime);
    const filterDate = this.datePipe.transform(parsedDate, 'yyyy-MM-dd HH:mm:ss');
    return filterDate;
  }

  changeCityForDoctors(value: any) {
    this.doctorModel = undefined;
    this.getAllDoctorsListByCity(value?.Id);
    this.enableDoctorItem = false;

  }

  changeDoctorForHospital(value: any) {
    this.doctorVendorModel = undefined;
    this.getAllVendorsListByDoctor(value?.Id);
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

  getAllCities() {
    this.isLoading = true;
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
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    });
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
          this.isLoading = false;
        }, 2000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoading = false;
      }
    })
  }

  changeHospitalForDoctor(value: any) {
    this.doctorModel = undefined;
    this.getAllDoctorListByHospital(value.Id);
    this.enableDoctorItem = false;
  }

}
