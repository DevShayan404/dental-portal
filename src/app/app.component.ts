import { Component, OnInit } from '@angular/core';
import { CoordinatesModel } from './models/cooridnatesModel.interface';
import { LoaderService } from './modules/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dentalportal';
  coordinates!: CoordinatesModel;

  constructor(public loaderService:LoaderService){}

  loader!: boolean;
  ngOnInit(): void {
    this.getCurrentLocation();

    this.loaderService.showLoader();
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 3000);
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
          // Do something with the coordinates
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
