import { DashboardService } from './service/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewPasswordComponent } from './view-password/view-password.component';

@Component({
  selector: 'app-portal-dashboard',
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.css']
})
export class PortalDashboardComponent implements OnInit {

  dasboardLayout: any = [];
  userName!: string;
  ref!: DynamicDialogRef;

  constructor(private router: Router,private DashboardService:DashboardService, private authService: AuthenticationService,private messageService: MessageService,  private dialogService: DialogService) { }

  ngOnInit(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // console.log("Your Screen Size", w, h)
    this.getName();
    this.DashboardService.getisFormSubmittedDialog().subscribe((response) => {
      this.ref.close();
    })
    
    this.dasboardLayout = [
      {
        title: 'Master Page',
        icon: 'fas	fa-braille',
        collapsedTitle:[
          {name:'Master Page',urlLink: 'master-page'}
      ],
        collapsedItemId: 'collapseMaster',
        collapsedItemtarget: '#collapseMaster',
        role: ['Admin']

      },
      {
        title: 'Dentists',
        icon: 'fas fa-user-md',
        collapsedTitle: [{name:'All Dentists',urlLink: 'doctors'}],
        collapsedItemId: 'collapseDoctors',
        collapsedItemtarget: '#collapseDoctors',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']
      },
      {
        title: 'Patient',
        icon: 'fas	fa-hospital-user',
        collapsedTitle:[{name:'Patient detail',urlLink: 'patient/patient-detail'}],
        collapsedItemId: 'collapsepatient',
        collapsedItemtarget: '#collapsepatient',
        role: ['Admin', 'Operation','Partner']

      },
      {
        title: 'View Hospital',
        icon: 'fas fa-city',
        collapsedTitle:[{name:'All Hospital',urlLink: 'hospital'}, {name:'Follow ups',urlLink: 'hospital/hospital-followup'}],
        collapsedItemId: 'collapseHospital',
        collapsedItemtarget: '#collapseHospital',
        role: ['Admin', 'Operation']
      },
      {
        title: 'Available Slots',
        icon: 'fas fa-user-md',
        
        collapsedTitle: [{name:'Slots',urlLink: 'slots'}],
        collapsedItemId: 'collapseSlots',
        collapsedItemtarget: '#collapseSlots',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']

      },
      {
        title: 'View Appointment',
        icon: 'fas fa-user-md',
        
        collapsedTitle:[{name:'Appointment',urlLink: 'view-appointment'}],
        collapsedItemId: 'collapseAppointment',
        collapsedItemtarget: '#collapseAppointment',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']
      },
      {
        title: 'View Follow Up',
        icon: 'fas fa-user-md',
        collapsedTitle: [{name:'Follow Up',urlLink: 'view-appointment/follow-up'}],
        collapsedItemId: 'collapseFollowup',
        collapsedItemtarget: '#collapseFollowup',
        role: ['Admin', 'Operation','Partner']
      },
      {
        title: 'View Operation Staff',
        icon: 'fas fa-user-md',
        
        collapsedTitle: [{name:'Operation Staff',urlLink: 'user'}],
        collapsedItemId: 'collapseUser',
        collapsedItemtarget: '#collapseUser',
        role: ['Admin']

      },
      {
        title: 'Services',
        icon: 'fas fa-list-ul',
      
        collapsedTitle: [{name:'All Services',urlLink: 'allservices'}],
        collapsedItemId: 'collapseServices',
        collapsedItemtarget: '#collapseServices',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']


      },
      {
        title: 'Degree',
        icon: 'fas fa-user-graduate',

        collapsedTitle: [{name:'All Degrees',urlLink: 'alldegrees'}],
        collapsedItemId: 'collapseDegree',
        collapsedItemtarget: '#collapseDegree',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']


      },
      {
        title: 'Province',
        icon: 'fas fa-map',
        collapsedTitle: [{name:'All Province',urlLink: 'province'}],
        collapsedItemId: 'collapseProvince',
        collapsedItemtarget: '#collapseProvince',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']

      },
      {
        title: 'City',
        icon: 'fas fa-city',
        collapsedTitle:[{name:'All Cities',urlLink: 'cities'}],
        collapsedItemId: 'collapseCities',
        collapsedItemtarget: '#collapseCities',
        role: ['VendorSuperUser', 'Admin', 'Operation','Partner']

      },
      {
        title: 'Ledgers',
        icon: 'fas fa-city',
        collapsedTitle:[{name:'All ledgers',urlLink: 'ledger'}],
        collapsedItemId: 'collapseledgers',
        collapsedItemtarget: '#collapseledgers',
        role: [ 'Admin']

      },
      {
        title: 'promotions',
        icon: 'fas fa-bullhorn',
        collapsedTitle:[{name:'All promotion',urlLink: 'promotion'}],
        collapsedItemId: 'collapsepromo',
        collapsedItemtarget: '#collapsepromo',
        role: ['Admin']

      },
      {
        title: 'Hospital fee',
        icon: 'fas fa-hospital-alt',
        collapsedTitle:[
          {name:'Hospital fee',urlLink: 'hospital-fee/hospitalfee'},
        {name:'Hospital %',urlLink: 'hospital-fee/hospitalpercentage'}
      ],
        collapsedItemId: 'collapseFee',
        collapsedItemtarget: '#collapseFee',
        role: ['Admin','Operation']

      }
     
     
    ]

  }

  

  removeToken() {
    localStorage.clear();
    this.router.navigate(['/authentication/login'])
  }
  // Toggle the side navigation
  togglesidebar() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      (<any>$('.sidebar .collapse')).collapse('hide');
    };

  }

  userRole:any;
  async getName() {
    const user: UserModel | null = await this.authService.decodeToken(localStorage.getItem('token')!);
    this.userRole = user?.role;
    if(user?.role == 'VendorSuperUser'){
      user.role = 'Partner';
    }
    this.userName = user?.name + ' (' + user?.role + ')';

  }


  resetPassword() {
    this.ref = this.dialogService.open(ResetPasswordComponent, {
      data: { data: 'o' },
      header: 'Reset Password', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  ViewPassword(){
    this.ref = this.dialogService.open(ViewPasswordComponent, {
      data: { data: 'o' },
      header: 'View Password', width: '65%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  // checkid(id:any){
  //   this.dasboardLayout[0].collapsedTitle;
  //   console.log("check test",this.dasboardLayout[0].collapsedTitle)
  // }
}
