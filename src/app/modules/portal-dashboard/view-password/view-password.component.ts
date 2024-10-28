import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DashboardService } from 'src/app/modules/portal-dashboard/service/dashboard.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';



@Component({
  selector: 'app-view-password',
  templateUrl: './view-password.component.html',
  styleUrls: ['./view-password.component.css']
})
export class ViewPasswordComponent {
  constructor(public config: DynamicDialogConfig,private router:Router,private authService:AuthenticationService, private formBuilder: UntypedFormBuilder,
    private DashboardService: DashboardService, private messageService: MessageService) { 

    }

    emailId:any
    onChangeEmail(event:any){
      this.emailId = event.target.value;
// console.log( "this.emailId", this.emailId)
    }
    
    showLoader:boolean = false;
    Password!:any;
  submit(){
    this.showLoader = true;
    this.Password = '';
    if(this.emailId){
          this.DashboardService.getViewPassword(this.emailId).subscribe((response:any) =>{
            // console.log("Response",response);
            if(response.IsSuccess == true){
              this.showLoader = false;
              this.Password = response.Result[0].Password;
              // this.authService.setisFormSubmittedDialog(true);
              // this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
            }else{
              this.showLoader = false;
              this.messageService.add({ severity: 'error', summary: 'error', detail: response?.ErrorMessages });

            }
          })
    }else{
      this.showLoader = false;
             this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enter email id' });

    }
  }


  ngOnInit(): void {
    let rowData = this.config?.data;

  }



}
