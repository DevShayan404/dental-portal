import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';
import { ViewFollowUpComponent } from './components/follow-up/view-follow-up/view-follow-up.component';
import { HasRoleGuard } from 'src/app/shared Module/has-role-guard/has-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewAppointmentComponent
  },
  {
    path: 'follow-up',
    canActivate: [HasRoleGuard],
    data: { role: ['Admin', 'Operation'] },
    component: ViewFollowUpComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
