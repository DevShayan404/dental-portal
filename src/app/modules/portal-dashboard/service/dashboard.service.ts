import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private isFormSubmittedDialog$ = new Subject<boolean>();
 
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http:HttpClient) { }


  resetPassword(password: string,userId: number,roleId:number) {

    let AddDURL = `${environment.LIVE}/api/Vendor/ChangePassword?changepassword=${password}&userID=${userId}&userRoleID=${roleId}`;
    return this.http.post(AddDURL, {
      headers:this.headers,
      responseType:'json'
    });
  }

  getViewPassword(email:any) {
    return this.http.get(`${environment.LIVE}/api/Vendor/GetVendorCredentials?email=${email}`);
  }

  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }
}
