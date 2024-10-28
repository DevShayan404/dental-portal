import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { DoctorModel } from 'src/app/models/doctorModel';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { PersonalInfoModel } from 'src/app/models/personalInfoSignupModel.interface';
import { ExperienceInfoModel } from 'src/app/models/experienceInfoSignupModel.interface';
import { ServiceInfoModel } from 'src/app/models/serviceInfoSignupModel.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorsServiceService {

  private isFormSubmittedDialog$ = new Subject<boolean>();
  
  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }

  GetAllDoctorsByCity(cityId: number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Doctor/GetDoctorsByCity?CityId=${cityId}`);
  }

  getDoctorById(doctorId: number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Doctor/GetDoctorDetailsById?doctorId=${doctorId}`);
  }

  // getAllVendorsByDoctor(doctorId: number): Observable<any>{
  //   return this.http.get(`${environment.LIVE}/api/Vendor/getVendorByDoctorId?DocId=${doctorId}`)
  // }

  getAllServiceByDoctorVendorId(doctorId: number, vendorId : number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Services/GetServicesByDoctorVendorId?DoctorId=${doctorId}&VendorId=${vendorId}`)
  }

  getDoctorStatus(): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Doctor/GetDoctorsStatus`)
  }

  AddDoctor(doctorModel: DoctorModel): Observable<any> {
    let AddDoctorURL = `${environment.LIVE}/api/Doctor/PostDoctor`;

    return this.http.post(AddDoctorURL, doctorModel, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  updateDoctor(doctorModel: any): Observable<any> {
    let updateDoctorURL = `${environment.LIVE}/api/Doctor/updateDoctor`;

    return this.http.put(updateDoctorURL, doctorModel, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  putDoctorPersonalInfo(personalInfoModel: PersonalInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/updateDoctorPersonalInfoByVendor`;
    return this.http.put<any>(url, personalInfoModel).pipe(
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

  putDoctorExperienceInfo(experienceInfoModel: ExperienceInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/updateDoctorExperienceByVendor`;
    return this.http.put<any>(url, experienceInfoModel).pipe(
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

  putDoctorEducationInfo(experienceInfoModel: ExperienceInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/updateDoctorEducationByVendor`;
    return this.http.put<any>(url, experienceInfoModel).pipe(
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

  putDoctorServiceInfo(serviceInfoModel: ServiceInfoModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/updateDoctorServiceByVendor`;
    return this.http.put<any>(url, serviceInfoModel).pipe(
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
  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }

  // getBookedSlotsForCalendar(doctorId: number, vendorId : number, Date: any): Observable<any>{
  //   return this.http.get(`${environment.LIVE}/api/SlotManagement/GetBookedSlots?DoctorId=${doctorId}&VendorId=${vendorId}&Date=${Date}`)
  // }


}

