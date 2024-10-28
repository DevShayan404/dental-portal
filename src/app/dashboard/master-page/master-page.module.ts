import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';
import { SearchByRoleComponent } from './component/search-by-role/search-by-role.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExpansionPanelComponent } from './component/expansion-panel/expansion-panel.component';
import { DoctorDetailComponent } from './component/expansion-panel/doctor-detail/doctor-detail.component';
import { PatientDetailComponent } from './component/expansion-panel/patient-detail/patient-detail.component';
import { AppointmentsDetailComponent } from './component/expansion-panel/appointments-detail/appointments-detail.component';
import { FinancialCostComponent } from './component/expansion-panel/financial-cost/financial-cost.component';
import { ExpansionPanelPatientComponent } from './component/expansion-panel-patient/expansion-panel-patient.component';
import { PatientAppoitmentsComponent } from './component/expansion-panel-patient/patient-appoitments/patient-appoitments.component';
import { LoaderComponent } from './loader/loader.component';
import { AppointmentModalComponent } from './dialogue-modaal/appointment-modal/appointment-modal.component';
import { HospitalLedgerComponent } from './component/expansion-panel/hospital-ledger/hospital-ledger.component';
import { DoctorServiceFaresComponent } from './component/expansion-panel/doctor-service-fares/doctor-service-fares.component';


@NgModule({
  declarations: [
    MasterPageComponent,
    SearchByRoleComponent,
    ExpansionPanelComponent,
    DoctorDetailComponent,
    PatientDetailComponent,
    AppointmentsDetailComponent,
    FinancialCostComponent,
    ExpansionPanelPatientComponent,
    PatientAppoitmentsComponent,
    LoaderComponent,
    AppointmentModalComponent,
    HospitalLedgerComponent,
    DoctorServiceFaresComponent
  ],
  imports: [
    CommonModule,
    MasterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgPrimeModule,
    SkeletonModule,
    NgSelectModule
  ],
  providers: [
    DatePipe, DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService

  ]
})
export class MasterPageModule { }
