import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LedgersRoutingModule } from './ledgers-routing.module';
import { LedgersComponent } from './ledgers.component';
import { LedgerViewComponent } from './components/ledger-view/ledger-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared Module/material/material.module';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { SkeletonModule } from 'src/app/modules/skeleton/skeleton.module';

@NgModule({
  declarations: [
    LedgersComponent,
    LedgerViewComponent
  ],
  imports: [
    CommonModule,
    LedgersRoutingModule,
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
export class LedgersModule { }
