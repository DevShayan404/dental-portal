import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddEditDoctorComponent } from './components/add-edit-doctor/add-edit-doctor.component';
import { VendorByDoctorsComponent } from './components/vendor-doctors/vendor-by-doctors/vendor-by-doctors.component';
import { ServiceVendorDoctorComponent } from './components/service-doctors/service-vendor-doctor/service-vendor-doctor.component';
import { AddEditVendorDoctorComponent } from './components/vendor-doctors/add-edit-vendor-doctor/add-edit-vendor-doctor.component';
import { AddEditServiceVendorDoctorComponent } from './components/service-doctors/add-edit-service-vendor-doctor/add-edit-service-vendor-doctor.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DoctorsComponent } from './components/doctors.component';
import { DoctorsServiceService } from './services/doctors-service.service';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { HasRoleModule } from 'src/app/core/directives/has-role.module';
import { ViewDoctorListComponent } from './components/view-doctor-list-by-hospital/view-doctor-list/view-doctor-list.component';
import { PersonalInfoComponent } from './components/add-edit-doctor/personal-info/personal-info.component';
import { ExperienceInfoComponent } from './components/add-edit-doctor/experience-info/experience-info.component';
import { ServiceInfoComponent } from './components/add-edit-doctor/service-info/service-info.component';
import { EducationInfoComponent } from './components/add-edit-doctor/education-info/education-info.component';

@NgModule({
  declarations: [
    DoctorsComponent,
    AddEditDoctorComponent,
    VendorByDoctorsComponent,
    ServiceVendorDoctorComponent,
    AddEditVendorDoctorComponent,
    AddEditServiceVendorDoctorComponent,
    CalendarComponent,
    ViewDoctorListComponent,
    PersonalInfoComponent,
    ExperienceInfoComponent,
    ServiceInfoComponent,
    EducationInfoComponent

  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    MaterialModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SkeletonModule,
    HasRoleModule

  ],
  providers: [
    DialogService, MessageService, DoctorsServiceService,DatePipe,DynamicDialogRef,DynamicDialogConfig, ConfirmationService
  ]
})
export class DoctorsModule { }
