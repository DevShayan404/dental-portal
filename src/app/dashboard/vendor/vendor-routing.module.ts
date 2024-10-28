import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './components/vendor.component';
import { ViewHospitalProfileComponent } from './components/view-hospital-profile/view-hospital-profile.component';
import { AddEditVendorComponent } from './components/add-edit-vendor/add-edit-vendor.component';
import { AddOfficeTimingComponent } from './components/add-edit-vendor/add-office-timing/add-office-timing/add-office-timing.component';
import { AddEditHospitalInfoComponent } from './components/add-edit-vendor/add-edit-hospital-info/add-edit-hospital-info/add-edit-hospital-info.component';
import { HospitalFollowupsComponent } from './components/hospital-followups/hospital-followups/hospital-followups.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
  },
  {
    path: 'view-hospital-profile',
    component: ViewHospitalProfileComponent
  },
  {
    path: 'hospital-followup',
    component: HospitalFollowupsComponent
  },
  
 
  {
    path: 'edit-hospital',
    component: AddEditVendorComponent,
    children: [
      {
        path: 'info',
        component: AddEditHospitalInfoComponent,
      },
      {
        path: 'office-timing',
        component: AddOfficeTimingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
