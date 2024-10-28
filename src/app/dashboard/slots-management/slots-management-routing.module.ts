import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotsManagementComponent } from './components/slots-management.component';
import { ViewSlotListComponent } from './components/view-slots-by-doctor/view-slot-list/view-slot-list.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSlotListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotsManagementRoutingModule { }
