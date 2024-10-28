import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../authentication.service';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { PersonalInfoModel } from 'src/app/models/personalInfoSignupModel.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { VendorHospitalInfoModel, VendorPersonalClinicInfoModel } from 'src/app/models/vendorInfoSignupModel.interface';
import { AfterViewInit } from '@angular/core';
import { CoordinatesModel } from 'src/app/models/cooridnatesModel.interface';
import { google } from "google-maps";
import { UtilHelpers } from 'src/app/core/utils/utils.component';

@Component({
  selector: 'app-vendor-info',
  templateUrl: './vendor-info.component.html',
  styleUrls: ['./vendor-info.component.css'],
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
export class VendorInfoComponent implements OnInit {
  citiesList: any;
  registrationModel: any = '1';
  hospitalList: any;
  visible: boolean = false;
  mapCenter!: { lat: any; lng: any; };
  lat!: any;
  long!: any;
  changeLatitude!: any;
  changeLongitude!: any;


  markerPosition!: { lat: any; lng: any; };
  isLoading: boolean = false;
  doctorId!: any;

  // google! : google;
  mapZoom = 12;
  center!: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private vendorService: VendorserviceService,
    private cityService: CitiesServiceService, private confirmationService: ConfirmationService,
    private messageService: MessageService, private authService: AuthenticationService) {
      this.doctorId = UtilHelpers.getDoctorId();
      if (!this.doctorId) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
        // localStorage.removeItem('userId');
      }
    this.getDecodedCoordinates();
  }

  ngOnInit(): void {
    this.getAllCitiesList();
    this.setMapCenterAndMarkerPosition();

  }

  vendorPersonalClinicInfoForm = this.formBuilder.group({
    businessName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    cityId: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    long: ['', [Validators.required]],
  })

  vendorHospitalInfoForm = this.formBuilder.group({
    vendorId: [''],
  })

  setMapCenterAndMarkerPosition() {
    this.mapCenter = {
      lat: this.lat,
      lng: this.long,
    };
    this.markerPosition = {
      lat: this.lat,
      lng: this.long,
    };

  }

  handleMapEvent(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.changeLatitude = this.markerPosition.lat;
      this.changeLongitude = this.markerPosition.lng;
      this.lat = this.markerPosition.lat;
      this.long = this.markerPosition.lng;
    }
  }


  createVendorHospitalInfoForm() {
    this.isLoading = true;
    const hospitalInfoDataForm: VendorHospitalInfoModel = this.vendorHospitalInfoForm.getRawValue();
    if (this.vendorHospitalInfoForm.valid && this.doctorId) {
      const vendorHospitalDataModel: VendorHospitalInfoModel[] = [{
        vendorId: hospitalInfoDataForm?.vendorId,
        doctorId: this.doctorId
      }]

      this.vendorHospitalInfoForm.setErrors({ 'invalid': true });
      this.authService.postSignupVendorHospitalInfoAuthentication(vendorHospitalDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          this.router.navigate(['../experience'], { relativeTo: this.activatedRoute });
          this.vendorHospitalInfoForm.reset();
          this.isLoading = false;
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

  createVendorPersonalClinicInfoForm() {
    this.isLoading = true;
    const vendorPersonalClinicInfoDataForm: VendorPersonalClinicInfoModel = this.vendorPersonalClinicInfoForm.getRawValue();
    if (this.vendorPersonalClinicInfoForm.valid && this.doctorId) {
      const vendorPersonalClinicDataModel: VendorPersonalClinicInfoModel = {
        businessName: vendorPersonalClinicInfoDataForm?.businessName,
        address1: vendorPersonalClinicInfoDataForm?.address1,
        address2: vendorPersonalClinicInfoDataForm?.address2,
        lat: vendorPersonalClinicInfoDataForm?.lat,
        long: vendorPersonalClinicInfoDataForm?.long,
        cityId: vendorPersonalClinicInfoDataForm?.cityId
      }
      this.vendorPersonalClinicInfoForm.setErrors({ 'invalid': true });
      this.authService.postSignupVendorPersonalClinicInfoAuthentication(vendorPersonalClinicDataModel, this.doctorId).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages ? response?.Messages[0] : 'Added Successfully..' });
          this.router.navigate(['../experience'], { relativeTo: this.activatedRoute });
          this.vendorPersonalClinicInfoForm.reset();
          this.isLoading = false;
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


  handleToggleRegistrationRadioEvent(event: any) {
    this.registrationModel = +event;
  }

  getAllCitiesList() {
    this.cityService.getAllCities().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.citiesList = response?.Result;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  getAllHospitalListByCity(cityId: number) {
    this.vendorService.getVendorsByCity(cityId).subscribe((response) => {
      if (response?.IsSuccess) {
        this.hospitalList = response?.Result;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }

  handleChangeHospitalByCity(event: any) {
    if (event) {
      const cityId = event?.value;
      this.getAllHospitalListByCity(cityId);
    }
  }

  validateVendorControls(controllerName: string, error: string) {
    return (this.vendorPersonalClinicInfoForm.get(controllerName)?.hasError(error));
  }

  handleMapDialog() {
    this.visible = !this.visible;
  }


  handleConfirmLocation() {
    if (this.changeLatitude && this.changeLongitude) {
      this.lat = this.changeLatitude;
      this.long = this.changeLongitude;
      this.vendorPersonalClinicInfoForm.get('lat')?.setValue(this.lat);
      this.vendorPersonalClinicInfoForm.get('long')?.setValue(this.long);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location selected..' });
      this.visible = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select location..' });

    }
  }


  confirmationHospitalInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.createVendorHospitalInfoForm();
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

  confirmationPersonalClinicInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.createVendorPersonalClinicInfoForm();
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

  private getDecodedCoordinates() {
    try {
      const coordinatesAtob: string = localStorage.getItem('coordinates')!;
      const currentCooridantes: CoordinatesModel = JSON.parse(window.atob(coordinatesAtob));
      this.lat = currentCooridantes.latitude;
      this.long = currentCooridantes.longitude;
    }
    catch (error) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Something went wrong in Coordinates' });
      localStorage.removeItem('coordinates');
    }
  }

}
