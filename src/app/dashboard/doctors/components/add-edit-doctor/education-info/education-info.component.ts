import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../authentication/authentication.service';
import { DegreeServiceService } from 'src/app/dashboard/degree/services/degree-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { EducationInfoArrayModel, EducationInfoModel } from 'src/app/models/educationInfoSignupModel.interface';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorsServiceService } from '../../../services/doctors-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.css'],
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
export class EducationInfoComponent implements OnInit {

  startingDateModel: Date | undefined;
  endingDateModel: Date | undefined;
  educationInfoForm!: UntypedFormGroup;
  itemsArray!: UntypedFormArray;
  degreeList: any;
  isLoading: boolean = false;
  isLoaderLoading: boolean = true;
  // doctorId!: any;
  userId!: any;
  isUpdate: boolean = false;
  addDoctorId!: any;
  editDoctorId!: any;
  editexperienceId!: any;
  doctorEducationDetails!: any;



  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private messageService: MessageService,
    private confirmationService: ConfirmationService, private doctorService: DoctorsServiceService,
    private activatedRoute: ActivatedRoute, private datePipe: DatePipe,
    private degreeService: DegreeServiceService, private authService: AuthenticationService) {

    this.educationInfoForm = new UntypedFormGroup({
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

  onDateSelectStart(event: any){
    const itemsArray = this.educationInfoForm.get('itemsArray') as FormArray;
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
  const itemsArray = this.educationInfoForm.get('itemsArray') as FormArray;
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

  ngOnInit(): void {

    

    this.getDegreeList();
    // this.addItem();

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
        this.doctorEducationDetails = response?.Result?.Educations;
        if (this.doctorEducationDetails.length > 0) {
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
      itemsArray: this.doctorEducationDetails.map((item: any) => {
        return {
          eduId: item?.eduId,
          doctorId: item?.doctorId,
          degreeId: item?.degreeId,
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
    // var data = { itemsArray: [ { degreeId: 1, startDate: '05/2023', endDate: '05/2023' }, { degreeId: 2, startDate: '05/2023', endDate: '05/2023' }]};
    data.itemsArray.map((item: any) => { this.addItem(); });
    this.educationInfoForm.patchValue(data);
  }

  createItem(): UntypedFormGroup {
    return this.formBuilder.group({
      eduId: [],
      doctorId: [],
      degreeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })

  }

  getDegreeList() {
    this.degreeService.getAllDegrees().subscribe((response) => {
      if (response) {
        this.degreeList = response;
      }
    });
  }

  addItem(): void {
    this.itemsArray = this.educationInfoForm.get('itemsArray') as UntypedFormArray;
    this.itemsArray.push(this.createItem());
  }

  updateEducationInfoForm() {
    this.isLoading = true;
    const educationInfoDataForm: EducationInfoArrayModel = this.educationInfoForm.getRawValue();

    if (this.educationInfoForm.valid && this.addDoctorId) {
      const educationInfoDataModel: EducationInfoModel | any = educationInfoDataForm?.itemsArray?.map((item) => ({
        eduId: item?.eduId,
        doctorId: item?.doctorId,
        startDate: this.setDateIntoTimeStamp(item?.startDate),
        endDate: this.setDateIntoTimeStamp(item?.endDate),
        degreeId: item?.degreeId
      }));
      this.educationInfoForm.setErrors({ 'invalid': true });
      this.doctorService.putDoctorEducationInfo(educationInfoDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          setTimeout(() => { this.router.navigate(['dashboard/doctors']); }, 1000);
          this.educationInfoForm.reset();
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
      this.educationInfoForm.setErrors({ 'invalid': true });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong please try again..' });
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


  createEducationInfoForm() {
    this.isLoading = true;
    const educationInfoDataForm: EducationInfoArrayModel = this.educationInfoForm.getRawValue();

    if (this.educationInfoForm.valid && this.addDoctorId) {
      const educationInfoDataModel: EducationInfoModel | any = educationInfoDataForm?.itemsArray?.map((item) => ({
        doctorId: this.addDoctorId ?? this.editDoctorId,
        startDate: item?.startDate,
        endDate: item?.endDate,
        degreeId: item?.degreeId
      }));
      this.educationInfoForm.setErrors({ 'invalid': true });
      this.authService.postSignupEducationInfoAuthentication(educationInfoDataModel).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
          this.router.navigate(['../service'], { relativeTo: this.activatedRoute });
          this.educationInfoForm.reset();
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

  getControls() {
    return (this.educationInfoForm.get('itemsArray') as UntypedFormArray).controls;
  }

  removeEducation(param: any) {
    this.itemsArray.removeAt(param);
  }

  confirmationEducationInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isUpdate ? this.updateEducationInfoForm() : this.createEducationInfoForm();
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
