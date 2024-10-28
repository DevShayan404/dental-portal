import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceModel } from 'src/app/models/servicesModel';
@Injectable({
  providedIn: 'root'
})
export class ServiceApisService {

  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http: HttpClient) { }

  private isFormSubmittedDialog$ = new Subject<boolean>();

  getAllServices(): Observable<any> {
    return this.http.get(`${environment.LIVE}/api/Services/GetServices`);
  }

  AddService(serviceModel: any) : Observable<any> {
    let AddServiceURL = `${environment.LIVE}/api/Services/createService`;

    const params = {
      name: serviceModel?.Name,
      fees: serviceModel?.fees! | 0
    };

    return this.http.post(AddServiceURL, params, {
      headers: this.headers,
      responseType: 'json'
    });
  }


  updateService(serviceModel: any) : Observable<any> {
    let AddServiceURL = `${environment.LIVE}/api/Services/UpdateService`;

    const params = {
      serviceId: serviceModel?.ServiceId,
      name: serviceModel?.Name,
      fees: serviceModel?.Fees | 0
    };

    console.log("update",params)

    return this.http.put(AddServiceURL, params, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  // /api/Services/deleteService/63
  DeleteService(id:number){
    return this.http.delete(`${environment.LIVE}/api/Services/deleteService/${id}`);
  }

  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }
}
