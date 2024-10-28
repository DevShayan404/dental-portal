import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http:HttpClient) {}

  getVPatientDetailByVendorId(vendorId:any){
    let http = `${environment.LIVE}/api/BookAppointment/GetAllPatientByVendorId?VendorId=${vendorId}`;
    return this.http.get<any>(http);
  }

 
  getpatientAppointment(patientId:any,visitStatus:any,vendorId:any){
    let http = `${environment.LIVE}/Patient/GetPatientAppointment?patientId=${patientId}&visitStatus=${visitStatus}&vendorId=${vendorId}`;
    return this.http.get<any>(http);
  }
}
