import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfWeekPipePipe } from './day-of-week-pipe.pipe';



@NgModule({
  declarations: [
    DayOfWeekPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DayOfWeekPipePipe
  ]
})
export class PipeModule { }
