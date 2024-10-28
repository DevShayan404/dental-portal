import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { MessageService } from 'primeng/api';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';


@NgModule({
  declarations: [
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgPrimeModule
  ],
  providers:[
    MessageService,

  ]
})
export class ProfileModule { }
