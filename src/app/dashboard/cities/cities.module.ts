import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { AddEditCitiesComponent } from './components/add-edit-cities/add-edit-cities.component';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { CitiesComponent } from './components/cities.component';



@NgModule({
  declarations: [
    CitiesComponent,
    AddEditCitiesComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
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
export class CitiesModule { }
