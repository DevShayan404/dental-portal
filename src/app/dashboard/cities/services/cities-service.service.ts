import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { CityModel } from 'src/app/models/cityModel';

@Injectable({
  providedIn: 'root'
})
export class CitiesServiceService {

  private isFormSubmittedDialog$ = new Subject<boolean>();
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<any>  {
    return this.http.get(`${environment.LIVE}/api/City/getAllCities`);
  }

  AddCity(cityModel: CityModel) {
    let AddCityURL = `${environment.LIVE}/api/City/createCity`;

    const params = {
      name: cityModel?.name
    }

    return this.http.post(AddCityURL, params, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  DeleteCIty(id:number){
    return this.http.delete(`${environment.LIVE}/api/City/delCity/${id}`);
  }

  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }

}
