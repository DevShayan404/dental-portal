import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorByDoctorsComponent } from './components/vendor-doctors/vendor-by-doctors/vendor-by-doctors.component';
import { ServiceVendorDoctorComponent } from './components/service-doctors/service-vendor-doctor/service-vendor-doctor.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DoctorsComponent } from './components/doctors.component';
import { ViewDoctorListComponent } from './components/view-doctor-list-by-hospital/view-doctor-list/view-doctor-list.component';
import { AddEditDoctorComponent } from './components/add-edit-doctor/add-edit-doctor.component';
import { PersonalInfoComponent } from 'src/app/dashboard/doctors/components/add-edit-doctor/personal-info/personal-info.component';
import { VendorInfoComponent } from 'src/app/authentication/sign-up/vendor-info/vendor-info.component';
import { ExperienceInfoComponent } from './components/add-edit-doctor/experience-info/experience-info.component';
import { EducationInfoComponent } from './components/add-edit-doctor/education-info/education-info.component';
import { ServiceInfoComponent } from './components/add-edit-doctor/service-info/service-info.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDoctorListComponent,
  },
  
  {
    path: 'edit-doctor',
    component: AddEditDoctorComponent,
    children: [
      {
        path: 'personal',
        pathMatch: 'full',
        component: PersonalInfoComponent,

      },
      {
        path: 'experience',
        component: ExperienceInfoComponent,
      }, {
        path: 'education',
        component: EducationInfoComponent,
      }, {
        path: 'service',
        component: ServiceInfoComponent,
      }
    ]
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  // {
  //   path: 'doctor-vendor/:doctorId',
  //   component: VendorByDoctorsComponent,
  //   children: [
  //     {
  //       path: 'doctor-service/:vendorId',
  //       component: ServiceVendorDoctorComponent
  //     }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
