import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { AddEditVendorComponent } from './components/add-edit-vendor/add-edit-vendor.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorComponent } from './components/vendor.component';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { ViewHospitalProfileComponent } from './components/view-hospital-profile/view-hospital-profile.component';
import { HospitalSignupComponent } from 'src/app/authentication/hospital-signup/hospital-signup/hospital-signup.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AddOfficeTimingComponent } from './components/add-edit-vendor/add-office-timing/add-office-timing/add-office-timing.component';
import { AddEditHospitalInfoComponent } from './components/add-edit-vendor/add-edit-hospital-info/add-edit-hospital-info/add-edit-hospital-info.component';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { HospitalFollowupsComponent } from './components/hospital-followups/hospital-followups/hospital-followups.component';

@NgModule({
  declarations: [
    VendorComponent,
    AddEditVendorComponent,
    ViewHospitalProfileComponent,
    AddOfficeTimingComponent,
    AddEditHospitalInfoComponent,
    HospitalFollowupsComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    MaterialModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    SkeletonModule,
    AuthenticationModule,
    PipeModule
  ],
  providers: [
    DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService, DatePipe

  ]
})
export class VendorModule { }
