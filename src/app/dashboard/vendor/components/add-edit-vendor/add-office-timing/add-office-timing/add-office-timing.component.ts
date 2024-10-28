import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { OfficeTimingInfoArrayModel, OfficeTimingInfoModel } from 'src/app/models/officeTimingInfoModel.interface';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { DatePipe } from '@angular/common';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-add-office-timing',
  templateUrl: './add-office-timing.component.html',
  styleUrls: ['./add-office-timing.component.css'],
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter', [
  //       style({ transform: 'translateX(100%)' }),
  //       animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
  //     ]),
  //     transition(':leave', [
  //       animate('500ms ease-in', style({ transform: 'translateX(100%)' })),
  //     ]),
  //   ]),
  // ],
})
export class AddOfficeTimingComponent implements OnInit {


  startingDateModel: Date | undefined;
  endingDateModel: Date | undefined;
  officeTimingInfoForm!: UntypedFormGroup;
  itemsArray!: UntypedFormArray;
  isLoading: boolean = false;


  isLoaderLoading: boolean = false;
  isUpdate: boolean = false;
  doctorofficeTimingDetails!: any;

  addDoctorId!: any;
  userId!: any;
  editDoctorId!: any;
  editofficeTimingId!: any;
  citiesList: any;
  cityModel: any;
  hospitalModel: any;
  hospitalList: any;
  statusModel:any;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private formBuilder: UntypedFormBuilder,private elementRef: ElementRef, private messageService: MessageService,
    private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private datePipe: DatePipe,
    private router: Router, private vendorService: VendorserviceService, private cityService: CitiesServiceService) {

    this.officeTimingInfoForm = new UntypedFormGroup({
      itemsArray: new UntypedFormArray([])
    });
  }




  WeekList: any = [{ id: 1, name: 'Sunday' }, { id: 2, name: 'Monday' }, { id: 3, name: 'Tuesday' }, { id: 4, name: 'Wednesday' }, { id: 5, name: 'Thursday' },
  { id: 6, name: 'Friday' }, { id: 7, name: 'Saturday' }];
  statusList: any = [{ id: 1, name: 'Open' }, { id: 0, name: 'Closed' }];

  ngOnInit(): void {
    // this.addItem();
    this.getAllCitiesList();
    this.getQueryParams();
    
  }


  editHospitalTimingId:any;
  IsUpdate:boolean = true;
  VendorId!:number;
  getQueryParams(){
    
    this.activatedRoute.queryParams.subscribe(params => {
      if (params){
       
        this.editHospitalTimingId = params['hospitalId'];
        if (this.editHospitalTimingId) {
          this.VendorId = this.editHospitalTimingId;
          this.IsUpdate = false;
          this.vendorService.getVendortimingList(this.editHospitalTimingId).subscribe((res:any)=>{
            // console.log("res timing",res)
const TimeArray = res.map((item:any) => ({
  Id:item.Id,
  isStatus: item.IsStatus,
  dayOfWeek: item.DayOfWeek,
  startTime:item.StartTime ?new Date(item.StartTime) : item.StartTime ,
  endTime: item.EndTime ?new Date(item.EndTime) : item.EndTime ,
  vendorId: item.VendorId,

}));

// console.log("finalTime",TimeArray)
       
          this.itemsArray = this.officeTimingInfoForm.get('itemsArray') as UntypedFormArray;
          TimeArray.forEach((item:any) => {

      // console.log("forceach",item);
      this.addItem();
    });

    this.officeTimingInfoForm.patchValue({ itemsArray: TimeArray });
      //  console.log("Patched data",TimeArray);
        })
      
        }
        else {
          // alert('crreate')
          this.addItem();
        
        }
      }else{
        
      }
    }
    );
  }


  addItem(): void {
    this.itemsArray = this.officeTimingInfoForm.get('itemsArray') as UntypedFormArray;
    this.itemsArray.push(this.createItem());
    try {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error("Error scrolling to target:", err);
    }
  }

  convertTimeStringToDate(timeString: any): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }

  
  onChangedayOfWeek(i:any){
    // console.log(this.officeTimingInfoForm.value.itemsArray)
   const dayOfWeekToCheck =  this.itemsArray.value[i].dayOfWeek;
    const occurrences = this.itemsArray.value.filter((item:any) => item.dayOfWeek === dayOfWeekToCheck);
    if (occurrences.length > 1) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Same day already exists' });

      this.officeTimingInfoForm.value.itemsArray[i].dayOfWeek = '';
       this.officeTimingInfoForm.patchValue({ itemsArray:  this.officeTimingInfoForm.value.itemsArray });
      // console.log("check",this.officeTimingInfoForm.value.itemsArray)
    }else{
    }

  }

  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      Id:[''],
      cityId: [''],
      isStatus: ['', [Validators.required]],
      dayOfWeek: ['', [Validators.required]],
      startTime: [''],
      endTime: [''],
      vendorId: [''],
    })

  }

  handleHospitalByCity(event: any) {
    this.isLoaderLoading = true;
    const cityId = event?.value?.Id;
    this.vendorService.getVendorsByCity(cityId).subscribe((response) => {
      if (response?.IsSuccess) {
        this.hospitalList = response?.Result;
        this.isLoaderLoading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoaderLoading = false;

      }
    });
  }
  getControls() {
    return (this.officeTimingInfoForm.get('itemsArray') as UntypedFormArray).controls;
  }
  removeOfficeTiming(param: any) {
    this.itemsArray.removeAt(param);
  }

  createOfficeTimingInfoForm() {
    this.isLoading = true;
    const isofficeTimingExist = this.officeTimingInfoForm.getRawValue();
    if (isofficeTimingExist?.itemsArray?.length > 0) {
      const officeTimingInfoDataForm: OfficeTimingInfoArrayModel = this.officeTimingInfoForm.getRawValue();
      if (this.officeTimingInfoForm.valid) {
const Id = isofficeTimingExist?.itemsArray[0].Id;
if(!Id){
  // alert('new Time')
  // to add new time
  const officeTimingInfoDataModel: OfficeTimingInfoModel | any = officeTimingInfoDataForm?.itemsArray?.map((item) => ({
    dayOfWeek: item?.dayOfWeek,
    startTime: this.TimeValidate(item?.startTime),
    endTime: this.TimeValidate(item?.endTime),
    vendorId: item?.vendorId?.Id | this.VendorId,
    isStatus: item?.isStatus
  }));
  this.officeTimingInfoForm.setErrors({ 'invalid': true });
  // console.log("New timing",officeTimingInfoDataModel);
  this.vendorService.postHospitalOfficeTiming(officeTimingInfoDataModel).subscribe((response: ResponseModel) => {
    // console.log("post",response)
          if (response?.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
            this.router.navigate(['dashboard/hospital']);
            this.officeTimingInfoForm.reset();
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
          }
        })
}else{
  // alert('Update Time')
  // to update time
  // console.log("row",officeTimingInfoDataForm?.itemsArray)
  const officeTimingInfoDataModel:any = officeTimingInfoDataForm?.itemsArray?.map((item) => ({
      dayOfWeek: item?.dayOfWeek,
      Id: item.Id ? item.Id : 0,
      startTime: this.TimeValidate(item?.startTime),
      endTime: this.TimeValidate(item?.endTime),
      vendorId: item?.vendorId ? item.vendorId : this.VendorId,
      isStatus: item?.isStatus
    
  }));
  this.officeTimingInfoForm.setErrors({ 'invalid': true });
  // console.log("Update timing",officeTimingInfoDataModel);
  this.vendorService.putHospitalTimings(officeTimingInfoDataModel).subscribe((response: ResponseModel) => {
    // console.log("response",response)
    if (response?.IsSuccess) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
      
      setTimeout(() => { this.router.navigate(['dashboard/hospital']);}, 1000);
      
      this.officeTimingInfoForm.reset();
      this.isLoading = false;
    }
    else {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
    }
  })
}

      
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong please try again..' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Add officeTiming..' });
      this.officeTimingInfoForm.setErrors({ 'invalid': true });
      this.isLoading = false;
    }
  }


  confirmationOfficeTimingeInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createOfficeTimingInfoForm();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
    });
  }

  getAllCitiesList() {
    this.isLoaderLoading = true;
    this.cityService.getAllCities().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.citiesList = response?.Result;
        this.isLoaderLoading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoaderLoading = false;
      }
    });
  }

  TimeValidate(time: string) {
    if (time !== "") {
      const startTime: string = time;
      const parsedDate = new Date(startTime);
      const filterDate = this.datePipe.transform(parsedDate, 'yyyy-MM-dd HH:mm:ss');
      return filterDate;
    }
    else{
      return null;
    }
  }

}
