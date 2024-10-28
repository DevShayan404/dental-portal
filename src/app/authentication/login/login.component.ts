import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import jwtDecode from 'jwt-decode';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/loginModel.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { UserModel } from 'src/app/models/userModel';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  isPassword: boolean = true;
  isLoading: boolean = false;
  value!: string;
  result: any;
  roleModel: any;
  rolesList: any;
  ref!: DynamicDialogRef;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogService: DialogService,
    private loginService: AuthenticationService,
    private vendorService: VendorserviceService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginService.getCurrentLocation();
  }

  @ViewChild('myInput') myInput!: ElementRef;

  ngOnInit(): void {
    this.getAllRoles();
    this.loginService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
    });
  }

  loginForm = this.formBuilder.group({
    roleId: ['', [Validators.required]],
    userEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async handleloginForm() {
    this.isLoading = true;
    const loginDataForm = this.loginForm.getRawValue();
    // console.log("login Raw",loginDataForm);

    if (this.loginForm.valid) {
      const loginDataModel: LoginModel = {
        roleId: loginDataForm?.roleId?.Id,
        userEmail: loginDataForm?.userEmail,
        password: loginDataForm?.password,
      };
      this.loginForm.setErrors({ invalid: true });
      this.loginService
        .postLoginAuthentication(loginDataModel)
        .subscribe(async (response: ResponseModel) => {
          // console.log("login",response?.Result);
          if (response?.IsSuccess) {
            localStorage.setItem('CP', loginDataForm?.password);
            localStorage.setItem('Rid', loginDataForm.roleId.Id);
            // console.log("role id",loginDataForm.roleId.Id)
            const accessToken = response?.Result?.token;
            const result: UserModel | null =
              await this.loginService.decodeToken(accessToken);
            // console.log("login Response",result)
            // console.log("loginDataForm?.roleId?.Role",loginDataForm?.roleId?.Role)
            if (result?.role == 'VendorSuperUser') {
              result.role = 'Partner';
            }
            if (result?.role == loginDataForm?.roleId?.Role) {
              const doctorId = result?.nameid!;
              localStorage.setItem('token', accessToken);
              localStorage.setItem('userId', window.btoa(doctorId));
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response?.Messages[0],
              });
              setTimeout(() => {
                this.isLoading = false;
                this.loginForm.reset();

                this.router.navigate(['/dashboard/main-dashboard']);
              }, 2000);
            } else {
              this.isLoading = false;
              // this.loginForm.reset();

              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Please select ${result?.role} Role for this crediential`,
              });
            }
          } else {
            this.isLoading = false;
            // this.loginForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.ErrorMessages[0],
            });
          }
        });
    }
  }

  markAllControlsAsDirty() {
    Object.values(this.loginForm.controls).forEach(
      (control: AbstractControl) => {
        control.markAsDirty();
      }
    );
  }

  handleView() {
    this.isPassword = !this.isPassword;
  }

  getAllRoles() {
    this.vendorService
      .getAllRolesList()
      .subscribe((response: ResponseModel) => {
        if (response.IsSuccess) {
          this.rolesList = response?.Result;
          this.rolesList[2].Role = 'Partner';
          console.log('role list', this.rolesList);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.ErrorMessages[0],
          });
        }
      });
  }

  ForgetPassword() {
    this.ref = this.dialogService.open(ForgetPasswordComponent, {
      data: { data: 'o' },
      header: 'Forget Password',
      width: '65%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
