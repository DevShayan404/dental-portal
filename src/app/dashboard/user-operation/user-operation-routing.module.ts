import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewListComponent } from './components/user-view-list/user-view-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserViewListComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOperationRoutingModule { }
