import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllServicesRoutingModule } from './all-services-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { AddEditServiceComponent } from './components/add-edit-service/add-edit-service.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { AllServicesComponent } from './components/all-services.component';


@NgModule({
  declarations: [
    AllServicesComponent,
    AddEditServiceComponent
  ],
  imports: [
    CommonModule,
    AllServicesRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgPrimeModule
  ],
  providers: [
    DialogService, MessageService
  ]
})
export class AllServicesModule { }
