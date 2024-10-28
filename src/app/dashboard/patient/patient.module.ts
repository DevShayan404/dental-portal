import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PatientComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgPrimeModule,
    MaterialModule,
    FormsModule,
     ReactiveFormsModule,
     NgSelectModule


  ],
  providers: [
    DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService

  ]
})
export class PatientModule { }
