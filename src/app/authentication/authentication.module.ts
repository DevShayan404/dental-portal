import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from '../shared Module/ng-prime/ng-prime.module';
import { MaterialModule } from '../shared Module/material/material.module';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonalInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/personal-info/personal-info.component';
import { VendorInfoComponent } from './sign-up/vendor-info/vendor-info.component';
import { ExperienceInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/experience-info/experience-info.component';
import { EducationInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/education-info/education-info.component';
import { ServiceInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/service-info/service-info.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { DialogService } from 'primeng/dynamicdialog';
import { HasRoleModule } from '../core/directives/has-role.module';
import { HospitalSignupComponent } from './hospital-signup/hospital-signup/hospital-signup.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SignUpComponent,
    // PersonalInfoComponent,
    VendorInfoComponent,
    // ExperienceInfoComponent,
    // EducationInfoComponent,
    // ServiceInfoComponent,
    HospitalSignupComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgPrimeModule,
    MaterialModule,
    GoogleMapsModule,
    HasRoleModule
  ],
  exports:[
    HospitalSignupComponent
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true}, MessageService, DialogService, ConfirmationService],
})
export class AuthenticationModule { }
