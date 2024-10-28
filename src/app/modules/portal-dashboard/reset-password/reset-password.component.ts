import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../service/dashboard.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @ViewChild('myInput') myInput!: ElementRef;
  @ViewChild('myInput2') myInput2!: ElementRef;
  isPassword: boolean = true;
  isPassword2: boolean = true;
  isUserUpdateBtn: boolean = false;
  constructor(public config: DynamicDialogConfig,private router:Router,private authService:AuthenticationService, private formBuilder: UntypedFormBuilder,
    private DashboardService: DashboardService, private messageService: MessageService) { 
this.getName();
    }

    userID:any;
    async getName() {
      const user: UserModel | null = await this.authService.decodeToken(localStorage.getItem('token')!);
    this.userID = user?.nameid;
    console.log("token",user)

    }


    checkPassword:any;
    passwordMatch:boolean = false;
    checkCurrentPassword(event:any){
      this.checkPassword = event.target.value;
      if(this.checkPassword == this.CurrentPassword){
        this.passwordMatch = true;
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Password matched' });
      }else{
        this.passwordMatch = false;
      }

    }


    newPassword:any;
    OnchangenewPassword(event:any){
      this.newPassword = event.target.value;
    }

    showLoader:boolean = false;
  submit(){
    this.showLoader = true;
    const email = this.userID;
    const password = this.newPassword;
    const roleId = this.roleId;
    // console.log("Check param",email,password,roleId);
    if(password){
          this.DashboardService.resetPassword(password,email,roleId).subscribe((response:any) =>{
            // console.log("Success",response)
            if(response.Code == 1){
              this.showLoader = false;
              this.DashboardService.setisFormSubmittedDialog(true);
              this.logout();
              this.messageService.add({ severity: 'success', summary: 'success', detail: response?.Messages });
            }else{
              this.showLoader = false;
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'something went wrong' });

            }
          })
    }else{
      this.showLoader = false;
             this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enter new password' });

    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/authentication/login'])
  }
CurrentPassword:any;
roleId!:number;
  ngOnInit(): void {
    let rowData = this.config?.data;
    this.CurrentPassword = localStorage.getItem('CP');
    this.roleId = Number(localStorage.getItem('Rid'));
    
    // console.log("Current Password", this.CurrentPassword , this.roleId)

  }



  handleView1() {
    this.isPassword = !this.isPassword;
  }
  handleView2() {
    this.isPassword2 = !this.isPassword2;
  }
  createdegreeForm() {
    // const degreeDataForm = this.degreeForm.getRawValue();
    // this.visible = false;

    // if (degreeDataForm?.Id == '' || degreeDataForm?.Id == null) {
    //   const degreeDataModel: any = {
    //     Name: degreeDataForm?.Name,
    //   }
    //   if (this.degreeForm?.valid) {
    //     this.degreeForm.disabled;

    //     this.degreeService.AddDegree(degreeDataModel).subscribe((response: any) => {
    //       if (response) {
    //         this.degreeForm.reset();
    //         this.degreeService.setisFormSubmittedDialog(true);
    //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Degree Created Successfully' });
    //       }
    //     })

    //   }
    // }

    // else {
    //   const degreeDataModel: any = {
    //     Name: degreeDataForm?.Name,
    //   }
    //   if (this.degreeForm?.valid) {
    //     this.degreeForm.disabled;
    //     this.degreeService.setisFormSubmittedDialog(true);
    //     this.degreeService.AddDegree(degreeDataModel).subscribe((response) => {
    //       if (response) {
    //         this.degreeForm.reset();
    //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
    //       }
    //     })

    //   }
    // }


  }

}
