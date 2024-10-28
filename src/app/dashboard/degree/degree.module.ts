import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DegreeRoutingModule } from './degree-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { AddEditDegreeComponent } from './components/add-edit-degree/add-edit-degree.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DegreeComponent } from './components/degree.component';



@NgModule({
  declarations: [
    DegreeComponent,
    AddEditDegreeComponent
  ],
  imports: [
    CommonModule,
    DegreeRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    MaterialModule,
    NgPrimeModule,
    ReactiveFormsModule
  ],
  providers: [
    DialogService, MessageService

  ]
})
export class DegreeModule { }
