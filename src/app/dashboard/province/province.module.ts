import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { AddEditProvinceComponent } from './components/add-edit-province/add-edit-province.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProvinceComponent } from './components/province.component';


@NgModule({
  declarations: [
    ProvinceComponent,
    AddEditProvinceComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    MaterialModule,
    NgPrimeModule,
    ReactiveFormsModule
  ],
  providers: [
    DialogService, MessageService

  ]
})
export class ProvinceModule { }
