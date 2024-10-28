import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { VendorserviceService } from '../../services/vendorservice.service';
import { CoordinatesModel } from 'src/app/models/cooridnatesModel.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-vendor',
  templateUrl: './add-edit-vendor.component.html',
  styleUrls: ['./add-edit-vendor.component.css']
})
export class AddEditVendorComponent implements OnInit {


  title = 'dentalportal';
  coordinates!: CoordinatesModel;
  items: any;
  isUpdateHospital: boolean = false;
  editHospitalId: any;

  constructor(public config: DynamicDialogConfig, private activatedRoute: ActivatedRoute) {
    this.getCurrentLocation();
    this.getQueryParams();
  }


  activeIndex: number = 0;
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    console.log("activeIndex",this.activeIndex)
}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Info',
        routerLink: 'dashboard/hospital/edit-hospital/info'
      },
      {
        label: 'Hospital Timings',
        routerLink: 'dashboard/hospital/edit-hospital/office-timing'
      },
    ];
  }


  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.editHospitalId = params['hospitalId'];
        if (this.editHospitalId) {

          this.isUpdateHospital = true;
        }
        else {
          this.isUpdateHospital = false;
        }
      }
    }
    );
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.coordinates = {
            longitude: longitude,
            latitude: latitude
          }
          localStorage.setItem('coordinates', window.btoa(JSON.stringify(this.coordinates)));
          // console.log(this.coordinates);
        },
        error => {
          console.log('Error occurred. Error code: ' + error.code);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }


}
