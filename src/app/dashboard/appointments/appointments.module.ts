import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';
import { AppointmentsService } from './services/appointments.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { HasRoleModule } from 'src/app/core/directives/has-role.module';
import { ViewFollowUpComponent } from './components/follow-up/view-follow-up/view-follow-up.component';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { AddEditFollowUpComponent } from './components/follow-up/add-edit-follow-up/add-edit-follow-up.component';


@NgModule({
  declarations: [
    ViewAppointmentComponent,
    ViewFollowUpComponent,
    AddEditFollowUpComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HasRoleModule,
    SkeletonModule
  ],
  providers: [
    AppointmentsService,
    DialogService, MessageService, DatePipe
  ]
})
export class AppointmentsModule { }
