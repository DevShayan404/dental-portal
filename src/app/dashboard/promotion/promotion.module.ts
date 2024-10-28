import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';


@NgModule({
  declarations: [
    PromotionComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgPrimeModule,
    SkeletonModule
  ],
  providers: [
    DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig, ConfirmationService, DatePipe

  ]
})
export class PromotionModule { }
