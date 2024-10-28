import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    NgApexchartsModule
  ]
})
export class MainDashboardModule { }
