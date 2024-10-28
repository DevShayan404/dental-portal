import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../authentication/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteDynamicDialogComponent } from 'src/app/modules/delete-dynamic-dialog/delete-dynamic-dialog.component';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { PersonalInfoModel } from 'src/app/models/personalInfoSignupModel.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { UserModel } from 'src/app/models/userModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
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
export class PersonalInfoComponent implements OnInit {

  value!: string;
  genderArray: any = [];
  selectedGenderModel!: any;
  initialNameArray: any = [];
  selectedInitNameModel!: any;
  isLoading: boolean = false;
  isLoaderLoading: boolean = true;
  ref!: DynamicDialogRef;
  // hospitalIcon: any = 'background-image: url(https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg)';
  base64File!: any;
  userId!: any;
  editDoctorId!: any;
  doctorDetails!: any;
  isUpdate: boolean = false;

  adminRole: any = ['Admin']
  operationRole: any = ['Operation']
  hospitalRole: any = ['VendorSuperUser']
  cityModel: any;
  doctorModel: any;
  CitiesList: any;
  enableHospitalItem: boolean = true;
  hospitalModel: any;
  vendorsListByCity: any;



  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private vendorService: VendorserviceService,
    private dialogService: DialogService, private activatedRoute: ActivatedRoute, private cityService: CitiesServiceService,
    private confirmationService: ConfirmationService, private messageService: MessageService,  private location: Location,
    private authService: AuthenticationService, private doctorService: DoctorsServiceService) {

      this.genderArray = [
        { id: 1, name: 'Male' }, { id: 2, name: 'Female' }]
      this.initialNameArray = [
        { Id: 1, initialName: 'Dr.' }, { Id: 2, initialName: 'Prof.' }, { Id: 3, initialName: 'Mr.' }, { Id: 4, initialName: 'Mrs.' }]
  
      this.getQueryParams();
    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong Please Login Again..' });
      localStorage.removeItem('userId');
    }

  }

  ngOnInit(): void {
    
  }

  
  backtoParentPage() {
    this.location.back();
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.editDoctorId = params['doctorId'];
        if (this.editDoctorId) {
          this.getDoctorById(this.editDoctorId);
          this.getAllCities();
        }
        else {
          this.isLoaderLoading = false;
          this.getAllCities();
        }
      }
    }
    );
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

  getDoctorById(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorDetails = response?.Result;
        this.personalInfoForm.patchValue({
          // profilePic: this.doctorDetails.ProfilePic,
          initialName: this.doctorDetails.InitialName,
          firstName: this.doctorDetails.FirstName,
          lastName: this.doctorDetails.LastName,
          fees: this.doctorDetails.Fees,
          number: this.doctorDetails.Number,
          gender: this.doctorDetails.Gender,
          email: this.doctorDetails.Email,
          contact1: this.doctorDetails.Contact1,
          contact2: this.doctorDetails.Contact2,
          status: this.doctorDetails.Status,
        });
        // this.hospitalIcon = `background-image: url(${this.doctorDetails.ProfilePic})`;
        this.selectedGenderModel = this.doctorDetails.Gender;
        this.selectedInitNameModel = this.doctorDetails.InitialName;
        this.isLoaderLoading = false;
        this.isUpdate = true;
        // console.log(this.personalInfoForm);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    });
  }


  personalInfoForm = this.formBuilder.group({
    // profilePic: [''],
    cityId: [''],
    hospitalId: [''],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    initialName: ['', [Validators.required]],
    fees: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    number: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    contact1: [''],
    contact2: [''],
    email: ['', [Validators.required, Validators.email]],
  })

  // async onUpload(event: any) {
  //   const file = event?.currentTarget.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     this.hospitalIcon = `background-image: url(${imageUrl})`;
  //     this.base64File = await this.convertToBase64(file);
  //     this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded..' });
  //   }
  // }

  // async convertToBase64(file: File) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result)
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error)
  //     }
  //   })
  // }

 async createpersonalInfoForm() {
    this.isLoading = true;
    const personalInfoDataForm: PersonalInfoModel = this.personalInfoForm.getRawValue();
    if (this.personalInfoForm.valid) {

      const personalInfoDataModel: PersonalInfoModel = {
        // profilePic: this.base64File,
        firstName: personalInfoDataForm?.firstName,
        lastName: personalInfoDataForm?.lastName,
        initialName: personalInfoDataForm?.initialName,
        fees: personalInfoDataForm?.fees,
        number: personalInfoDataForm?.number,
        gender: personalInfoDataForm?.gender,
        email: personalInfoDataForm?.email,
        contact1: personalInfoDataForm?.contact1,
        contact2: personalInfoDataForm?.contact2,

      }
      this.personalInfoForm.setErrors({ 'invalid': true });
      const result = await this.authService.decodeTokenFromLocalStorage() as UserModel;
      if (result.role === 'Admin' || result.role === 'Operation') {
        this.userId = this.hospitalModel?.Id;

      } 
      this.authService.postDoctorPersonalInfo(personalInfoDataModel, this.userId).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          localStorage.setItem('addDoctorId', response?.Result?.DoctorId);
          localStorage.setItem('addDoctorVendorId', response?.Result?.Id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          // this.router.navigate(['../experience'], {relativeTo: this.route, queryParams: { doctorId: response?.Result?.Id } });
          this.router.navigate(['../experience'], { relativeTo: this.activatedRoute });

          this.personalInfoForm.reset();
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        }
      })

    }


  }

  updatePersonalInfoForm() {
    this.isLoading = true;
    const personalInfoDataForm: PersonalInfoModel = this.personalInfoForm.getRawValue();
    if (this.personalInfoForm.valid) {

      const personalInfoDataModel: PersonalInfoModel = {
        id: this.editDoctorId,
        // profilePic: this.base64File ? this.base64File : personalInfoDataForm?.profilePic,
        firstName: personalInfoDataForm?.firstName,
        lastName: personalInfoDataForm?.lastName,
        initialName: personalInfoDataForm?.initialName,
        fees: personalInfoDataForm?.fees,
        number: personalInfoDataForm?.number,
        gender: personalInfoDataForm?.gender,
        email: personalInfoDataForm?.email,
        contact1: personalInfoDataForm?.contact1,
        contact2: personalInfoDataForm?.contact2,

      }

      this.personalInfoForm.setErrors({ 'invalid': true });
      this.doctorService.putDoctorPersonalInfo(personalInfoDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          setTimeout(() => { this.router.navigate(['dashboard/doctors']); }, 1000);
          this.personalInfoForm.reset();
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        }
      })

    }
  }

  markAllControlsAsDirty() {
    Object.values(this.personalInfoForm.controls).forEach((control: AbstractControl) => {
      control.markAsDirty();
    });
  }


  handleIsProceed() {
    this.ref = this.dialogService.open(DeleteDynamicDialogComponent, {
      header: 'Confirm', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }


  validateControls(controllerName: string, error: string) {
    return (this.personalInfoForm.get(controllerName)?.hasError(error));
  }


  confirmationPersonalInfo() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isUpdate ? this.updatePersonalInfoForm() : this.createpersonalInfoForm();
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

  changeCityForHospitals(value: any) {
    this.hospitalModel = undefined;
    this.getHospitalListByCityId(value.Id);
    this.enableHospitalItem = false;
  }


  getHospitalListByCityId(cityId: number) {
    this.isLoaderLoading = true;
    this.vendorService.getVendorsByCity(cityId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
        setTimeout(() => {
          this.isLoaderLoading = false;
        }, 2000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoaderLoading = false;
      }
    })
  }


}
