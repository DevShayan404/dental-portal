import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../authentication.service';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { CoordinatesModel } from 'src/app/models/cooridnatesModel.interface';
import { HospitalSignupModel } from 'src/app/models/hospitalSignupModel.Interface';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';
import { DoctorsServiceService } from 'src/app/dashboard/doctors/services/doctors-service.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-hospital-signup',
  templateUrl: './hospital-signup.component.html',
  styleUrls: ['./hospital-signup.component.css'],
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
export class HospitalSignupComponent implements OnInit {
  @ViewChild('mapSearchField') searchField!:ElementRef;
  @ViewChild(GoogleMap) map!:GoogleMap;
  citiesList: any;
  // registrationModel: any = '1';
  hospitalList!: HospitalSignupModel;
  visible: boolean = false;
  mapCenter!: { lat: any; lng: any; };
  lat!: any;
  long!: any;
  changeLatitude!: any;
  changeLongitude!: any;
  cityModel: any;
  hospitalIcon!: any;

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
    // maxZoom: 15,
    // minZoom: 8,
  };
  base64File!: any;


  @Input() isAdd = false;
  editHospitalId!: number;
  isUpdateHospital: boolean = false;


  loggedIn:any
  constructor(private formBuilder: UntypedFormBuilder,private doctorservice:DoctorsServiceService,private http: HttpClient, private router: Router, private vendorService: VendorserviceService, private location: Location,
    private cityService: CitiesServiceService, private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute,
    private messageService: MessageService, private authService: AuthenticationService) {
    this.authService.getCurrentLocation();
    this.loggedIn = localStorage.getItem('LoginUSer')!;
  }

  ngOnInit(): void {
    this.getAllCitiesList();
    this.getQueryParams();
    this.getStatusList();
  }

  ngAfterViewInit():void{
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement,
    );
    // console.log(this.searchField.nativeElement)
    searchBox.addListener('places_changed', () =>{
      const places = searchBox.getPlaces();
      if(places?.length === 0){
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places?.forEach((place:any) =>{
        if(place.geometry?.viewport){
          bounds.union(place.geometry.viewport);
        }else{
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    
    })
  }

  StatusList:any
  getStatusList(){
    this.doctorservice.getDoctorStatus().subscribe(status =>{
      this.StatusList = status.Result;
      console.log(this.StatusList);
    })
  }

  
  backtoParentPage() {
    this.location.back();
  }
  

  hospitalInfoForm = this.formBuilder.group({
    businessName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    cityId: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    long: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    aboutme: [''],
    Status:[''],
    link1: [''],
    link2: ['']
  })

  getQueryParams(){
    this.activatedRoute.queryParams.subscribe(params => {
      if (params){
        this.editHospitalId = params['hospitalId'];
        if (this.editHospitalId) {
          this.getHospitalProfileList(this.editHospitalId);
          this.isUpdateHospital = true;
          this.getDecodedCoordinates();
        }
        else {
          this.isUpdateHospital = false;
          this.getDecodedCoordinates();
          setTimeout(() => {
          
            this.setMapCenterAndMarkerPosition();
           }, 2000);
        
        }
      }
    }
    );
  }

  getHospitalProfileList(hospitalId: number) {
// alert(hospitalId)
    this.vendorService.getVendorById(hospitalId).subscribe((response: ResponseModel) => {
      // console.log("hospitalList", response.Result[0]);
      if (response.IsSuccess) {
        this.hospitalList = response.Result[0];
     
        if (this.hospitalList) {
          this.hospitalInfoForm.patchValue({
            businessName: this.hospitalList.BusinessName,
            address1: this.hospitalList.Address1,
            address2: this.hospitalList.Address2,
            lat: this.hospitalList.Lat,
            long: this.hospitalList.Long,
            phoneNumber: this.hospitalList.PhoneNumber,
            email: this.hospitalList.Email,
            aboutme: this.hospitalList.AboutMe,
            link1: this.hospitalList.Link1,
            link2: this.hospitalList.Link2,
            Status:this.hospitalList.Status
          });
          this.lat = +this.hospitalList.Lat!;
          this.long = +this.hospitalList.Long!;
          this.cityModel = this.hospitalList?.City;
          this.setMapCenterAndMarkerPosition();

        }
        setTimeout(() => { this.isLoading = false; }, 2000);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }
    })
  }

  setMapCenterAndMarkerPosition() {
    this.mapCenter = {
      lat: parseFloat(this.lat),
      lng: parseFloat(this.long),
    };
    this.markerPosition = {
      lat: parseFloat(this.lat),
      lng: parseFloat(this.long),
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

  selectedFile:any
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.selectedFile = file;
    }


  createhospitalInfoForm() {
    // alert("create")
    this.isLoading = true;
    const hospitalInfoDataForm = this.hospitalInfoForm.getRawValue();
    const cityIdFetched = hospitalInfoDataForm?.cityId?.Id;
    const status = hospitalInfoDataForm.Status ? hospitalInfoDataForm.Status : 2;
    if (this.hospitalInfoForm.valid) {
      const formData = new FormData();
      formData.append('BusinessName',hospitalInfoDataForm?.businessName );
      formData.append('Address1', hospitalInfoDataForm?.address1);
      formData.append('Address2', hospitalInfoDataForm?.address2);
      formData.append('Lat', hospitalInfoDataForm?.lat);
      formData.append('Long',hospitalInfoDataForm?.long);
      formData.append('CityId', cityIdFetched);
      formData.append('PhoneNumber', hospitalInfoDataForm?.phoneNumber);
      formData.append('Email', hospitalInfoDataForm?.email);
      formData.append('Status', status);
      formData.append('ProfilePic', this.selectedFile);

      console.log("formData",hospitalInfoDataForm,status)
      this.hospitalInfoForm.setErrors({ 'invalid': true });
      this.authService.postHospitalSignup(formData).subscribe((response: ResponseModel) => {
        console.log("response sigup",response)
        if (response?.StatusCode == 200) {
          console.log("response sigup",response)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.Messages[0]});
          this.isAdd ? this.router.navigate(['dashboard/hospital/edit-hospital/office-timing']) : this.router.navigate(['authentication/login']);
          this.hospitalInfoForm.reset();
          this.isLoading = false;
        }else if(response?.StatusCode == 400){
          this.messageService.add({ severity: 'info', summary: 'info', detail: response?.ErrorMessages[0] });

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

  LoginUSerObj:any
  updatehospitalInfoForm() {
    this.isLoading = true;
    const x: string = localStorage.getItem('LoginUSer')!;
    this.LoginUSerObj = JSON.parse(window.atob(x));
    const hospitalInfoDataForm = this.hospitalInfoForm.getRawValue();
    const cityIdFetched = hospitalInfoDataForm?.cityId?.Id;
    const RoleId =this.LoginUSerObj.nameid;
    if (this.hospitalInfoForm.valid) {
      const formData = new FormData();
    const id = String(this.editHospitalId)
      formData.append('Id',id);
      formData.append('BusinessName',hospitalInfoDataForm?.businessName );
      formData.append('Address1', hospitalInfoDataForm?.address1);
      formData.append('Address2', hospitalInfoDataForm?.address2);
      formData.append('Lat', hospitalInfoDataForm?.lat);
      formData.append('Long',hospitalInfoDataForm?.long);
      formData.append('CityId', cityIdFetched);
      formData.append('PhoneNumber', hospitalInfoDataForm?.phoneNumber);
      formData.append('Email', hospitalInfoDataForm?.email);
      formData.append('AboutMe', hospitalInfoDataForm?.aboutme);
      formData.append('Link1', hospitalInfoDataForm?.link1);
      formData.append('Link2', hospitalInfoDataForm?.link2);
      formData.append('Status', hospitalInfoDataForm?.Status);
      formData.append('ProfilePic', this.selectedFile);

      

      this.hospitalInfoForm.setErrors({ 'invalid': true });
      this.vendorService.putHospitalInfo(formData,RoleId).subscribe((response: ResponseModel) => {
        // console.log("update",formData );
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages ? response?.Messages[0] : 'Added Successfully..' });
          this.router.navigate(['dashboard/hospital']);
          this.hospitalInfoForm.reset();
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


  // handleToggleRegistrationRadioEvent(event: any) {
  //   this.registrationModel = +event;
  // }

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
      const cityId = event?.value?.Id;
      this.getAllHospitalListByCity(cityId);
    }
  }

  validateVendorControls(controllerName: string, error: string) {
    return (this.hospitalInfoForm.get(controllerName)?.hasError(error));
  }

  handleMapDialog() {
    this.visible = !this.visible;
  }


  handleConfirmLocation() {
    if (this.changeLatitude && this.changeLongitude) {
      this.lat = this.changeLatitude;
      this.long = this.changeLongitude;
      this.hospitalInfoForm.get('lat')?.setValue(this.lat);
      this.hospitalInfoForm.get('long')?.setValue(this.long);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location selected..' });
      this.visible = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select location..' });

    }
  }

  confirmationSignup() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isUpdateHospital ? this.updatehospitalInfoForm() : this.createhospitalInfoForm();
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


  coordinates:any
  private getDecodedCoordinates() {
    try {
      const coordinatesAtob: string = localStorage.getItem('coordinates')!;
      const currentCooridantes: CoordinatesModel = JSON.parse(window.atob(coordinatesAtob));
      this.lat = currentCooridantes.latitude;
      this.long = currentCooridantes.longitude;
      // console.log("old",currentCooridantes);
    }
    catch (error) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Something went wrong in Coordinates' });
      localStorage.removeItem('coordinates');
    }
  }




}
