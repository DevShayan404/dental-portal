import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PortalDashboardComponent } from './modules/portal-dashboard/portal-dashboard.component';
import { AuthGuard } from './shared Module/auth-guard/auth.guard';
import { NotFoundPageComponent } from './modules/not-found-page/not-found-page.component';
import { HasRoleGuard } from './shared Module/has-role-guard/has-role.guard';
import { LogOutGuard } from './shared Module/logout-guard/log-out.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authentication/login' },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [LogOutGuard],

  },
  {
    path: 'dashboard',
    component: PortalDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main-dashboard',
        loadChildren: () =>
          import('./dashboard/main-dashboard/main-dashboard.module').then((m) => m.MainDashboardModule)
      },
      {
        path: 'doctors',
        canActivate: [HasRoleGuard],
        data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/doctors/doctors.module').then((m) => m.DoctorsModule)
      },

      {
        path: 'view-appointment',
        canActivate: [HasRoleGuard],
        data: {role: ['VendorSuperUser', 'Admin', 'Operation','Partner']},
        loadChildren: () =>
          import('./dashboard/appointments/appointments.module').then((m) => m.AppointmentsModule)
      },

      {
        path: 'view-profile',
        canActivate: [HasRoleGuard],
        data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/profile/profile.module').then((m) => m.ProfileModule)
      },

      {
        path: 'slots',
        canActivate: [HasRoleGuard],
        data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/slots-management/slots-management.module').then((m) => m.SlotsManagementModule)
      },
      {
        path: 'allservices',
        canActivate: [HasRoleGuard],
        data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/all-services/all-services.module').then((m) => m.AllServicesModule)
      },
      {
        path: 'alldegrees',
        canActivate: [HasRoleGuard],
         data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/degree/degree.module').then((m) => m.DegreeModule)
      },

      {
        path: 'cities',
        canActivate: [HasRoleGuard],
         data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/cities/cities.module').then((m) => m.CitiesModule)
      },

      {
        path: 'province',
        canActivate: [HasRoleGuard],
         data: { role: ['VendorSuperUser', 'Admin', 'Operation','Partner'] },
        loadChildren: () =>
          import('./dashboard/province/province.module').then((m) => m.ProvinceModule)
      },
      {
        path: 'hospital',
        canActivate: [HasRoleGuard],
        data: { role: ['VendorSuperUser','Admin','Operation'] },
        loadChildren: () =>
          import('./dashboard/vendor/vendor.module').then((m) => m.VendorModule)
      },
      {
        path: 'user',
        canActivate: [HasRoleGuard],
        data: { role: ['Admin']},
        loadChildren: () =>
          import('./dashboard/user-operation/user-operation.module').then((m) => m.UserOperationModule)
      },
      { path: 'ledger', 
      canActivate: [HasRoleGuard],
      data: { role: ['Admin'] },
      loadChildren: () => import('./dashboard/ledgers/ledgers.module').then(m => m.LedgersModule) 
    },
    { path: 'promotion', 
    canActivate: [HasRoleGuard],
    data: { role: ['Admin'] },
    loadChildren: () => import('./dashboard/promotion/promotion.module').then(m => m.PromotionModule) },

    { path: 'hospital-fee',
    canActivate: [HasRoleGuard],
    data: { role: ['Admin','Operation'] },
     loadChildren: () => 
     import('./dashboard/hospital-fee/hospital-fee.module').then(m => m.HospitalFeeModule) },

     { path: 'patient',
     canActivate: [HasRoleGuard],
    data: { role: ['Admin','Operation','Partner'] },
      loadChildren: () => 
      import('./dashboard/patient/patient.module').then(m => m.PatientModule) },

      { path: 'master-page',
      canActivate: [HasRoleGuard],
      data: { role: ['Admin'] },
       loadChildren: () => import('./dashboard/master-page/master-page.module').then(m => m.MasterPageModule) },

    ]

  },


  {
    path: '**',
    component: NotFoundPageComponent
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
