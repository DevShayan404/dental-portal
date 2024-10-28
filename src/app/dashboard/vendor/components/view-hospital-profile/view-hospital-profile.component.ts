import { Component, OnInit } from '@angular/core';
import { ProfileModel } from 'src/app/models/profileModel';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorserviceService } from '../../services/vendorservice.service';

@Component({
  selector: 'app-view-hospital-profile',
  templateUrl: './view-hospital-profile.component.html',
  styleUrls: ['./view-hospital-profile.component.css']
})
export class ViewHospitalProfileComponent implements OnInit {

  isLoading: boolean = true;
  hospitalList!: any;
  hospitalId: any;
  userId: any;


  constructor(private vendorService : VendorserviceService, private location: Location,
    private route: Router, private messageService: MessageService, private activatedRoute: ActivatedRoute) {
    
    this.getQueryParams();
    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
   }

  ngOnInit(): void {
  }


  backtoParentPage() {
    this.location.back();
  }
  
  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.hospitalId = params['hospitalId'];
        if (this.hospitalId) {
          this.getHospitalProfileList(this.hospitalId);
        }
        else {
        this.route.navigate(['dashboard/doctors']);
        }
      }
    }
    );
  }

  getHospitalProfileList(hospitalId: number){
    this.vendorService.getVendorById(hospitalId).subscribe((response : ResponseModel)=>{
      if(response.IsSuccess){
        this.hospitalList = response.Result[0];
        setTimeout(() => { this.isLoading = false; }, 2000);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }
    })
  }

}
