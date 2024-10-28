import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { MaterialModule } from 'src/app/shared Module/material/material.module';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ]
})
export class OrdersModule { }
