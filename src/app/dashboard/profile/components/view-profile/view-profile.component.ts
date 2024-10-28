import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileModel } from 'src/app/models/profileModel';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  isLoading: boolean = true;
  doctorList!: any;
  doctorId: any;
  userId: any;


  constructor(private profileService: ProfileService, private location: Location,
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
        this.doctorId = params['doctorId'];
        if (this.doctorId) {
          this.getProfileList(this.doctorId);
        }
        else {
        this.route.navigate(['dashboard/doctors']);
        }
      }
    }
    );
  }

  getProfileList(doctorId: number){
    this.profileService.GetDoctorProfileById(doctorId).subscribe((response : ResponseModel)=>{
      if(response.IsSuccess){
        this.doctorList = response.Result;
        setTimeout(() => { this.isLoading = false; }, 2000);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }
    })
  }

}
