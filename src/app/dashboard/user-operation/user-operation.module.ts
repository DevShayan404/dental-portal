import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserOperationRoutingModule } from './user-operation-routing.module';
import { UserViewListComponent } from './components/user-view-list/user-view-list.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorsServiceService } from '../doctors/services/doctors-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserViewListComponent,
    AddEditUserComponent,
  ],
  imports: [
    CommonModule,
    UserOperationRoutingModule,
    NgPrimeModule,
    MaterialModule,
    SkeletonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DialogService, MessageService, DoctorsServiceService,DatePipe,DynamicDialogRef,DynamicDialogConfig, ConfirmationService
  ]
})
export class UserOperationModule { }
