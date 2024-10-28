import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LedgersComponent } from './ledgers.component';

const routes: Routes = [{ path: '', component: LedgersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgersRoutingModule { }
