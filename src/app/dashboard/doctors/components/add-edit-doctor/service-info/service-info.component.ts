import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../authentication/authentication.service';
import { ServiceApisService } from 'src/app/dashboard/all-services/services/service-apis.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { ServiceInfoArrayModel, ServiceInfoModel } from 'src/app/models/serviceInfoSignupModel.interface';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ServiceInfoComponent implements OnInit {


  startingDateModel: Date | undefined;
  endingDateModel: Date | undefined;

  serviceInfoForm!: UntypedFormGroup;
  itemsArray!: UntypedFormArray;
  serviceList: any;
  isLoading: boolean = false;
  doctorvendorId!: any;
  userId!: any;
  isUpdate: boolean = false;
  addDoctorId!: any;
  editDoctorId!: any;
  editServiceId!: any;
  doctorServiceDetails!: any;
  isLoaderLoading: boolean = true;

  

  vendorsByDoctorList: any;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private messageService: MessageService,
    private activatedRoute: ActivatedRoute, private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private serviceApi: ServiceApisService, private doctorService: DoctorsServiceService, private authService: AuthenticationService) {

    this.serviceInfoForm = new UntypedFormGroup({
        itemsArray: new UntypedFormArray([])
      });
    this.getQueryParams();
    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }

    this.doctorvendorId = +localStorage.getItem('addDoctorVendorId')!;
  }

  ngOnInit(): void {
    

    this.getAllServiceList();
    // this.addItem();
    // this.patchValuesForEdit();
    // this.getHospitalById();

  }

  
  getAllServiceList() {
    this.serviceApi.getAllServices().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.serviceList = response?.Result;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }
    });
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.editDoctorId = params['doctorId'];
        if (this.editDoctorId) {
          this.getDoctorById(this.editDoctorId);
        }
        else {
          this.isLoaderLoading = false;
          this.addItem();
        }
      }
    }
    );
  }

  getDoctorById(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorServiceDetails = response?.Result?.DoctorVendors[0]?.DoctorServices;
        if (this.doctorServiceDetails.length > 0) {
          this.handleEditServiceRecord();
        }
        else {
          this.isLoaderLoading = false;
          this.isUpdate = false;
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  handleEditServiceRecord() {
    const ServicePatchData = {
      itemsArray: this.doctorServiceDetails.map((item: any) => {
        return {
          name: item?.Name,
          serviceId: item?.ServiceId,
          fixedPercentage: item?.FixedPercentage,
          fees: item?.Fees,
          doctorVendorId: item?.DoctorVendorId,
          discount: item?.Discount,
          id: item?.Id,          
        };
      })
    };
    this.patchValuesForEdit(ServicePatchData);
    this.isLoaderLoading = false;
    this.isUpdate = true;
  }


  patchValuesForEdit(data: any) {
    // var data = { itemsArray: [ { serviceId: 1, fees: 2000 }, { serviceId: 2, fees: 2000 }]};
    data.itemsArray.map((item: any) => { this.addItem(); });
    this.serviceInfoForm.patchValue(data);
  }

  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [],
      fees: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      doctorVendorId: [],
      name: [],
      discount: [],
      fixedPercentage: [],
      serviceId: [''],
    })

  }

  addItem(): void {
    this.itemsArray = this.serviceInfoForm.get('itemsArray') as UntypedFormArray;
    this.itemsArray.push(this.createItem());
  }

  getControls() {
    return (this.serviceInfoForm.get('itemsArray') as UntypedFormArray).controls;
  }

  updateServiceInfoForm() {
    this.isLoading = true;
    const serviceInfoDataForm: ServiceInfoArrayModel = this.serviceInfoForm.getRawValue();

    if (this.serviceInfoForm.valid) {
      const serviceInfoDataModel: ServiceInfoModel | any = serviceInfoDataForm?.itemsArray?.map((item) => ({
        id: item?.id,
        discount: item?.discount,
        doctorVendorId: item?.doctorVendorId,
        name: item?.name,
        fixedPercentage: item?.fixedPercentage,
        serviceId: item?.serviceId,
        fees: item?.fees,
      }));
      this.serviceInfoForm.setErrors({ 'invalid': true });
      this.doctorService.putDoctorServiceInfo(serviceInfoDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          this.serviceInfoForm.reset();
          this.isLoading = false;
          this.router.navigate(['dashboard/doctors']);
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        }
      })
    }
    else {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong please try again..' });
    }

  }

  createServiceInfoForm() {
    this.isLoading = true;
    const serviceInfoDataForm: ServiceInfoArrayModel = this.serviceInfoForm.getRawValue();

    if (this.serviceInfoForm.valid && this.doctorvendorId) {
      const serviceInfoDataModel: ServiceInfoModel | any = serviceInfoDataForm?.itemsArray?.map((item) => ({
        doctorVendorId: this.doctorvendorId,
        serviceId: item?.serviceId,
        fees: item?.fees,
      }));
      this.serviceInfoForm.setErrors({ 'invalid': true });
      this.authService.postSignupServiceInfoAuthentication(serviceInfoDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          this.serviceInfoForm.reset();
          this.isLoading = false;
          this.router.navigate(['dashboard/doctors']);
          localStorage.removeItem('addDoctorId');
          localStorage.removeItem('addDoctorVendorId');
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        }
      })
    }
    else {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong please try again..' });
    }

  }



  removeService(param: any) {
    this.itemsArray.removeAt(param);
  }


  confirmationServiceInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.isUpdate ? this.updateServiceInfoForm() : this.createServiceInfoForm();

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

}
