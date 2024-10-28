import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalDashboardComponent } from './modules/portal-dashboard/portal-dashboard.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeleteDynamicDialogComponent } from './modules/delete-dynamic-dialog/delete-dynamic-dialog.component';
import { NotFoundPageComponent } from './modules/not-found-page/not-found-page.component';
import { HasRoleModule } from './core/directives/has-role.module';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from './modules/loader/loader/loader.component';
import { ResetPasswordComponent } from './modules/portal-dashboard/reset-password/reset-password.component';
import { NgPrimeModule } from 'src/app/shared Module/ng-prime/ng-prime.module';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ViewPasswordComponent } from './modules/portal-dashboard/view-password/view-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalDashboardComponent,
    MainDashboardComponent,
    DeleteDynamicDialogComponent,
    NotFoundPageComponent,
    LoaderComponent,
    ResetPasswordComponent,
    ViewPasswordComponent,
    // HasRoleDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgApexchartsModule,
    HasRoleModule,
    ToastModule,
    NgPrimeModule
  ],
  providers: [
    DialogService, MessageService

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
