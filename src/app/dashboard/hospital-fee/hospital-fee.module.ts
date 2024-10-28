import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalFeeRoutingModule } from './hospital-fee-routing.module';
import { HospitalFeeComponent } from './hospital-fee.component';
import { SetHospitalFeeComponent } from './component/set-hospital-fee/set-hospital-fee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SetHospitalFeeModaalComponent } from './Dialogue-Modaal/set-hospital-fee-modaal/set-hospital-fee-modaal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HospitalPercentageComponent } from './component/hospital-percentage/hospital-percentage.component';
import { HospitalPercentModaalComponent } from './Dialogue-Modaal/hospital-percent-modaal/hospital-percent-modaal.component';
@NgModule({
  declarations: [
    HospitalFeeComponent,
    SetHospitalFeeComponent,
    SetHospitalFeeModaalComponent,
    HospitalPercentageComponent,
    HospitalPercentModaalComponent
  ],
  imports: [
    CommonModule,
    HospitalFeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgPrimeModule,
    SkeletonModule,
    NgSelectModule
  ],
  providers: [
    DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService

  ]
})
export class HospitalFeeModule { }
