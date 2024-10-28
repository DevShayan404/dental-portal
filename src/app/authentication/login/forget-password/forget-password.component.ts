import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DashboardService } from 'src/app/modules/portal-dashboard/service/dashboard.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private vendorService:VendorserviceService,public config: DynamicDialogConfig,private router:Router,private authService:AuthenticationService, private formBuilder: UntypedFormBuilder,
    private DashboardService: DashboardService, private messageService: MessageService) { 
this.getAllRoles();
    }


    rolesList:any;
    getAllRoles(){
      this.vendorService.getAllRolesList().subscribe((response: any) => {
        if(response.IsSuccess){
          this.rolesList = response?.Result;
          this.rolesList[2].Role = 'Partner'
          // console.log("role list", this.rolesList)
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
  
        }
      })
    }

    ModelRoleId!:number
    emailId:any
    onChangeEmail(event:any){
      this.emailId = event.target.value;
// console.log( this.emailId , this.ModelRoleId)
    }
    
    showLoader:boolean = false;
  submit(){
    this.showLoader = true;
    if(this.emailId && this.ModelRoleId){
          this.authService.postvendorForget(this.emailId,this.ModelRoleId).subscribe((response:any) =>{
            // console.log("Success",response)
            if(response.Code == 1){
              this.showLoader = false;
              this.authService.setisFormSubmittedDialog(true);
              this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
            }else{
              this.showLoader = false;
              this.messageService.add({ severity: 'error', summary: 'error', detail: response?.message });

            }
          })
    }else{
      this.showLoader = false;
             this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enter Role & email id' });

    }
  }


  ngOnInit(): void {
    let rowData = this.config?.data;

  }



  
}
