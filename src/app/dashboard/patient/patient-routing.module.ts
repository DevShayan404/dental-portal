import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';

const routes: Routes = [
  
  {
    path: '',
   
    children: [
      {
        path: 'patient-detail',
        pathMatch: 'full',
        component: PatientDetailComponent,
  
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
