import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    SkeletonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule
  ],
  exports:[SkeletonComponent, LoaderComponent]
})
export class SkeletonModule { }
