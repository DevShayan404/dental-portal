import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalFeeComponent } from './hospital-fee.component';
import { SetHospitalFeeComponent } from './component/set-hospital-fee/set-hospital-fee.component';
import { HospitalPercentageComponent } from './component/hospital-percentage/hospital-percentage.component';

const routes: Routes = [

{
  path: '',
 
  children: [
    {
      path: 'hospitalfee',
      pathMatch: 'full',
      component:SetHospitalFeeComponent ,

    },
    {
      path: 'hospitalpercentage',
      // pathMatch: 'full',
      component:HospitalPercentageComponent ,

    }
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalFeeRoutingModule { }
