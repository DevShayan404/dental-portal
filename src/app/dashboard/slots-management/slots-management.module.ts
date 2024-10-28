import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { SlotsManagementRoutingModule } from './slots-management-routing.module';
import { AddEditSlotsComponent } from './components/add-edit-slots/add-edit-slots.component';
import { SlotsManagementComponent } from './components/slots-management.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DoctorsServiceService } from '../doctors/services/doctors-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { HasRoleModule } from 'src/app/core/directives/has-role.module';
import { ViewSlotListComponent } from './components/view-slots-by-doctor/view-slot-list/view-slot-list.component';


@NgModule({
  declarations: [
    SlotsManagementComponent,
    AddEditSlotsComponent,
    ViewSlotListComponent
  ],
  imports: [
    CommonModule,
    SlotsManagementRoutingModule,
    NgPrimeModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SkeletonModule,
    HasRoleModule,
    SkeletonModule

  ],
  providers: [
    DialogService, MessageService, DoctorsServiceService, DatePipe
  ]
})
export class SlotsManagementModule { }
