import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel.interface';
import { LoginModel } from '../models/loginModel.interface';
import { PersonalInfoModel } from '../models/personalInfoSignupModel.interface';
import { ExperienceInfoModel } from '../models/experienceInfoSignupModel.interface';
import { EducationInfoModel } from '../models/educationInfoSignupModel.interface';
import { VendorHospitalInfoModel, VendorPersonalClinicInfoModel } from '../models/vendorInfoSignupModel.interface';
import { ServiceInfoModel } from '../models/serviceInfoSignupModel.interface';
import jwtDecode from 'jwt-decode';
import { UserModel } from '../models/userModel';
import { HospitalSignupModel } from '../models/hospitalSignupModel.Interface';
import { CoordinatesModel } from '../models/cooridnatesModel.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user!: UserModel

  constructor(private http: HttpClient) { }


  postDoctorPersonalInfo(personalInfoModel: PersonalInfoModel, vendorId: number): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/CreateDoctorByVendor/${vendorId}`;
    return this.http.post<any>(url, personalInfoModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postSignupExperienceInfoAuthentication(experienceInfoModel: ExperienceInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Authentication/signUpDoctorExperience`;
    return this.http.post<any>(url, experienceInfoModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postSignupEducationInfoAuthentication(educationInfoModel: EducationInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Authentication/signUpDoctorEducation`;
    return this.http.post<any>(url, educationInfoModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postSignupVendorHospitalInfoAuthentication(vendorHospitalInfoModel: VendorHospitalInfoModel[]): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Authentication/signUpDoctorVendor`;
    return this.http.post<any>(url, vendorHospitalInfoModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postSignupVendorPersonalClinicInfoAuthentication(vendorPersonalClinicInfoModel: VendorPersonalClinicInfoModel, doctorId: number): Observable<ResponseModel> {
    let request = { vendor: vendorPersonalClinicInfoModel };
    let url = `${environment.LIVE}/api/Authentication/signUpDoctorPersonalClinic/${doctorId}`;
    return this.http.post<any>(url, request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postSignupServiceInfoAuthentication(serviceInfoModel: ServiceInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Authentication/signUpDoctorService`;
    return this.http.post<any>(url, serviceInfoModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postHospitalSignup(hospitalSignupModel: any): Observable<ResponseModel> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
    });
    let url = `${environment.LIVE}/api/Vendor/signUpVendor`;
    return this.http.post<any>(url, hospitalSignupModel,{headers}).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  postLoginAuthentication(loginModel: LoginModel): Observable<any> {
    let url = `${environment.LIVE}/api/Vendor/VendorLogin`;
    return this.http.post(url, loginModel).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Server error:', error);
        } else {
          console.log('Client-side error:', error);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  hasRole(role: any): boolean {
    // return this.user.role?.includes(role) || false;


    // I need to return array roles // 
    return role.includes(this.user.role) || false;
  }

  GetToken() {
    return localStorage.getItem('token') || '';
  }

  async decodeToken(token: string) {
    try {
      this.user = await jwtDecode(token);
      // console.log(this.user, 'user details');
      localStorage.setItem('LoginUSer', window.btoa(JSON.stringify(this.user)));

      return this.user;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  async decodeTokenFromLocalStorage() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await jwtDecode(token);
        return userData;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  coordinates!: CoordinatesModel;
  getCurrentLocation() {
    // alert("auth")
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
        },
        error => {
          console.log('Error occurred. Error code: ' + error.code);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

 

  postvendorForget(userEmail:any,userRoleID:number) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
    });
    let AddDURL = `${environment.LIVE}/api/Vendor/vendorForget?userEmail=${userEmail}&userRoleID=${userRoleID}`;
    return this.http.post(AddDURL, {
      headers:headers,
      responseType:'json'
    });
  }


  private isFormSubmittedDialog$ = new Subject<boolean>();

  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }

}
