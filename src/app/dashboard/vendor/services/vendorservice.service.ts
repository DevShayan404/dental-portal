import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { get } from 'jquery';
import { environment } from 'src/environments/environment';
import { Subject, Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { HospitalSignupModel } from 'src/app/models/hospitalSignupModel.Interface';

@Injectable({
  providedIn: 'root'
})
export class VendorserviceService {

  private isFormSubmittedDialog$ = new Subject<boolean>();
  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }
  
  // https://api.dentalbooking.ca/api/Vendor/getVendorListByCityId?CityId=0

  getVendorsByCity(cityId : number):Observable<ResponseModel>{
    let VendorsByCity = `${environment.LIVE}/api/Vendor/getVendorListByCityId?CityId=${cityId}`;
    return this.http.get<any>(VendorsByCity);
  }

  getVendorsDetailByCity(cityId : number):Observable<ResponseModel>{
   
    let VendorsByCity = `${environment.LIVE}/api/Vendor/getVendorsByCityId?CityId=${cityId}`;
    console.log("VendorsByCity",VendorsByCity)
    return this.http.get<any>(VendorsByCity);
  }

  getVendorsByDoctorId(doctorId : number):Observable<ResponseModel> {
    let VendorsByDoctor = `${environment.LIVE}/api/Vendor/GetVendorByDoctorId?DocId=${doctorId}`;
    return this.http.get<any>(VendorsByDoctor);
  }

  getVendorById(hospitalId : number):Observable<ResponseModel> {
    let VendorsByDoctor = `${environment.LIVE}/api/Vendor/getVendorById?id=${hospitalId}`;
    return this.http.get<any>(VendorsByDoctor);
  }

  getDoctorListByVendorId(vendorId : number):Observable<ResponseModel> {
    let VendorsByDoctor = `${environment.LIVE}/api/Vendor/GetDoctorListByVendorId?VendorId=${vendorId}`;
    return this.http.get<any>(VendorsByDoctor);
  }

  getAllRolesList():Observable<ResponseModel> {
    return this.http.get<any>(`${environment.LIVE}/api/Vendor/GetAllRoles`);
  }

  AddVendor(vendorModel : any){
    let AddVendorURL = `${environment.LIVE}/Degree/PostDegree`;
    const params = {
      name:vendorModel?.Name
    }

    return this.http.post(AddVendorURL,params,{
      headers:this.headers,
      responseType:'json'
    });
  }

  // postHospitalSignup(hospitalSignupModel: any): Observable<ResponseModel> {
  //   const headers = new HttpHeaders({
  //     'enctype': 'multipart/form-data',
  //   });
  //   let url = `${environment.LIVE}/api/Vendor/signUpVendor`;
  //   return this.http.post<any>(url, hospitalSignupModel,{headers}).pipe(
  //     catchError((error: any) => {
  //       if (error instanceof HttpErrorResponse) {
  //         console.log('Server error:', error);
  //       } else {
  //         console.log('Client-side error:', error);
  //       }
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }

  putHospitalInfo(updateHospitalModel: any,role:any): Observable<ResponseModel> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
    });
    let url = `${environment.LIVE}/api/Vendor/updateVendorProfile/${role}`;
    return this.http.put<any>(url, updateHospitalModel,{headers}).pipe(
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


  getVendortimingList(HospitalId : number):Observable<ResponseModel>{
    let VendorsByCity = `${environment.LIVE}/api/Vendor/GetOfficeTimingByVenID?vendorId=${HospitalId}`;
    return this.http.get<any>(VendorsByCity);
  }

  
  putHospitalTimings(Obj:any): Observable<any> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
    });
    let url = `${environment.LIVE}/api/Vendor/UpdateOfficeTimingsVendorsBulk`;
    return this.http.put<any>(url, Obj,{headers}).pipe(
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




  postHospitalOfficeTiming(officeTimingModel: HospitalSignupModel): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/Vendor/AddOfficeTimings`;
    return this.http.post<any>(url, officeTimingModel).pipe(
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


  /////////////////Hospital followups////////////////

 gethospitalRemarks(hospitalId : number){
    let remarks = `${environment.LIVE}/api/Vendor/getVendorRemarks?vendorId=${hospitalId}`;
    return this.http.get(remarks);
  }

  postHospitalRemarks(remarksObj: any){
    let url = `${environment.LIVE}/api/Vendor/AddVendorRemarks`;
    return this.http.post<any>(url, remarksObj).pipe(
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
}
