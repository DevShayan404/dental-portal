import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';




@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    OverlayModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
    
  ]
})
export class MaterialModule { }
