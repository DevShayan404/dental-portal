import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';

import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    DynamicDialogModule,
    PanelModule,
    CardModule,
    SidebarModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    CalendarModule,
    PasswordModule,
    StepsModule,
    FieldsetModule,
    RadioButtonModule,
    DialogModule,
    InputMaskModule,
    MessagesModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    SkeletonModule,
    TableModule,
    AccordionModule,
    FileUploadModule,
    InputTextareaModule
    
  ],
})
export class NgPrimeModule { }
