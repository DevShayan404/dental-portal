import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PersonalInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/personal-info/personal-info.component';
import { VendorInfoComponent } from './sign-up/vendor-info/vendor-info.component';
import { ExperienceInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/experience-info/experience-info.component';
import { EducationInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/education-info/education-info.component';
import { ServiceInfoComponent } from '../dashboard/doctors/components/add-edit-doctor/service-info/service-info.component';
import { AuthenticationComponent } from './authentication.component';
import { HospitalSignupComponent } from './hospital-signup/hospital-signup/hospital-signup.component';


const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent,
        children: [
          // {
          //   path: 'personal',
          //   component: PersonalInfoComponent,
          // },
          // {
          //   path: 'vendor',
          //   component: VendorInfoComponent,
          // }, {
          //   path: 'experience',
          //   component: ExperienceInfoComponent,
          // }, {
          //   path: 'education',
          //   component: EducationInfoComponent,
          // }, {
          //   path: 'service',
          //   component: ServiceInfoComponent,
          // }
          {
            path: '',
            component: HospitalSignupComponent
          }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
