import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }

  GetDoctorProfileById(doctorId: number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Doctor/GetDoctorDetailsById?doctorId=${doctorId}`);
  }
}
