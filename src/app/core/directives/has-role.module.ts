
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './has-role.directive';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    HasRoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HasRoleDirective
  ]
})
export class HasRoleModule { }
