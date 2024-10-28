import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../authentication/authentication.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ExperienceInfoArrayModel, ExperienceInfoModel } from 'src/app/models/experienceInfoSignupModel.interface';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experience-info',
  templateUrl: './experience-info.component.html',
  styleUrls: ['./experience-info.component.css'],
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
export class ExperienceInfoComponent implements OnInit {

  startingDateModel: Date | undefined;
  endingDateModel: Date | undefined;
  experienceInfoForm!: UntypedFormGroup;
  itemsArray!: UntypedFormArray;
  isLoading: boolean = false;


  isLoaderLoading: boolean = true;
  isUpdate: boolean = false;
  doctorExperienceDetails!: any;

  addDoctorId!: any;
  userId!: any;
  editDoctorId!: any;
  editexperienceId!: any;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private messageService: MessageService, private doctorService: DoctorsServiceService,
    private confirmationService: ConfirmationService, private datePipe: DatePipe,
    private authService: AuthenticationService) {

    this.experienceInfoForm = new UntypedFormGroup({
      itemsArray: new UntypedFormArray([])
    });
    this.getQueryParams();
    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }

    this.addDoctorId = +localStorage.getItem('addDoctorId')!;
    if (this.addDoctorId === 0) {
      this.addDoctorId = +this.editDoctorId;
    }


  }

  ngOnInit(): void {
  }

  
  onDateSelectStart(event: any){
    const itemsArray = this.experienceInfoForm.get('itemsArray') as FormArray;
    const startDate = itemsArray.at(0).get('startDate')?.value;
    const endDate = itemsArray.at(0).get('endDate')?.value;
    if(endDate){
      if (endDate < startDate) {
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'End date cannot be before start date!' });
        itemsArray.at(0).get('endDate')?.reset();
      }
    }
  }

  onDateSelectEnd(event: any) {
  const itemsArray = this.experienceInfoForm.get('itemsArray') as FormArray;
  const startDate = itemsArray.at(0).get('startDate')?.value;
  const endDate = itemsArray.at(0).get('endDate')?.value;
if(startDate){
  if (endDate < startDate) {
    this.messageService.add({ severity: 'info', summary: 'info', detail: 'End date cannot be before start date!' });
    itemsArray.at(0).get('startDate')?.reset();
    itemsArray.at(0).get('endDate')?.reset();
  }
}else{
  this.messageService.add({ severity: 'info', summary: 'info', detail: 'Select start date  first!' });
  itemsArray.at(0).get('endDate')?.reset();
}
  }


  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [],
      doctorId: [],
      hospitalName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })

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
        this.doctorExperienceDetails = response?.Result?.Experiences;
        if (this.doctorExperienceDetails.length > 0) {
          this.handleEditExperienceRecord();
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

  handleEditExperienceRecord() {
    const experiencePatchData = {
      itemsArray: this.doctorExperienceDetails.map((item: any) => {
        return {
          id: item?.id,
          doctorId: item?.doctorId,
          hospitalName: item?.hospitalName,
          startDate: this.datePipe.transform(item?.startDate, 'MM/yyyy'),
          endDate: this.datePipe.transform(item?.endDate, 'MM/yyyy')
        };
      })
    };
    this.patchValuesForEdit(experiencePatchData);
    this.isLoaderLoading = false;
    this.isUpdate = true;
  }

  patchValuesForEdit(data: any) {
    data.itemsArray.map((item: any) => { this.addItem(); });
    this.experienceInfoForm.patchValue(data);
  }


  addItem(): void {
    this.itemsArray = this.experienceInfoForm.get('itemsArray') as UntypedFormArray;
    this.itemsArray.push(this.createItem());
  }

  createExperienceInfoForm() {
    this.isLoading = true;
    const isExperienceExist = this.experienceInfoForm.getRawValue();
    if (isExperienceExist?.itemsArray?.length > 0) {
      const experienceInfoDataForm: ExperienceInfoArrayModel = this.experienceInfoForm.getRawValue();
      if (this.experienceInfoForm.valid && this.addDoctorId) {
        const experienceInfoDataModel: ExperienceInfoModel | any = experienceInfoDataForm?.itemsArray?.map((item) => ({
          doctorId: this.addDoctorId,
          startDate: item?.startDate,
          endDate: item?.endDate,
          hospitalName: item?.hospitalName
        }));
        this.experienceInfoForm.setErrors({ 'invalid': true });
        this.authService.postSignupExperienceInfoAuthentication(experienceInfoDataModel).subscribe((response: ResponseModel) => {
          if (response?.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
            this.router.navigate(['../education'], { relativeTo: this.activatedRoute });
            this.experienceInfoForm.reset();
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
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Add Experience..' });
      this.experienceInfoForm.setErrors({ 'invalid': true });
      this.isLoading = false;
    }
  }

  updateExperienceInfoForm() {
    this.isLoading = true;
    const isExperienceExist = this.experienceInfoForm.getRawValue();
    if (isExperienceExist?.itemsArray?.length > 0) {
      const experienceInfoDataForm: ExperienceInfoArrayModel = this.experienceInfoForm.getRawValue();
      if (this.experienceInfoForm.valid) {
        const experienceInfoDataModel: ExperienceInfoModel | any = experienceInfoDataForm?.itemsArray?.map((item) => ({
          id: item?.id,
          doctorId: item?.doctorId,
          startDate: this.setDateIntoTimeStamp(item?.startDate),
          endDate: this.setDateIntoTimeStamp(item?.endDate),
          hospitalName: item?.hospitalName
        }));
        this.experienceInfoForm.setErrors({ 'invalid': true });
        this.doctorService.putDoctorExperienceInfo(experienceInfoDataModel).subscribe((response: ResponseModel) => {
          if (response?.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
            setTimeout(() => { this.router.navigate(['dashboard/doctors']); }, 1000);
            this.experienceInfoForm.reset();
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Add Experience..' });
      this.experienceInfoForm.setErrors({ 'invalid': true });
      this.isLoading = false;
    }
  }

  setDateIntoTimeStamp(inputDate: any) {
    const isDateStampTime = /\+/.test(inputDate);
    if (isDateStampTime) {
      return this.datePipe.transform(inputDate, 'yyyy-MM-ddTHH:mm:ss');
    }
    else {
      const date = inputDate.split('/');
      const parsedDate = new Date(`${date[0]}/01/${date[1]}`);
      return this.datePipe.transform(parsedDate, 'yyyy-MM-ddTHH:mm:ss');
    }

  }

  getControls() {
    return (this.experienceInfoForm.get('itemsArray') as UntypedFormArray).controls;
  }

  removeExperience(param: any) {
    this.itemsArray.removeAt(param);
  }

  confirmationExperienceInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isUpdate ? this.updateExperienceInfoForm() : this.createExperienceInfoForm();
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
