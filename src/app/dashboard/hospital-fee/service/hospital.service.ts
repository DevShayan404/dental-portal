import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http:HttpClient) {}

  getFeeType(){
    let http = `${environment.LIVE}/api/VendorFees/getAllFeeType`;
    return this.http.get<any>(http);
  }


  getVendorFeesByVendorId(vendorId:any){
    let http = `${environment.LIVE}/api/VendorFees/getVendorFeesByVendorId?vendorId=${vendorId}`;
    return this.http.get<any>(http);
  }

  addHospitalFee(loginId:any,Feeobj:any): Observable <any> {
    let http = `${environment.LIVE}/api/VendorFees/createVendorFees/${loginId}`;
    // console.log(http)
    return this.http.post(http, Feeobj, {
      headers: this.headers,
      responseType: 'json'
    });
  }
  // /${Id}
  updateHospitalFee(Id: number,Role:number, hospitalObj:any): Observable<any> {
    let http = `${environment.LIVE}/api/VendorFees/UpdateVendorFees/${Role}`;
    // console.log("http",http)
    return this.http.put(http, hospitalObj, {
      headers: this.headers,
      responseType: 'json'
    });
  }


  deleteVendorFees(id: number): Observable <any> {
    return this.http.delete(`${environment.LIVE}/api/VendorFees/DeleteVendorFees/${id}`, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  ////////////////////Hospital percentage/////////////////////////

  createVendorPercentage(loginId:any,Percentobj:any): Observable <any> {
    let http = `${environment.LIVE}/api/VendorPercentage/createVendorPercentage/${loginId}`;
    console.log("creeate",http);
    return this.http.post(http, Percentobj, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getVendorPercentage(vendorId:any){
    let http = `${environment.LIVE}/api/VendorPercentage/getPercentageByVendorId/${vendorId}`;
    return this.http.get<any>(http);
  }

  // /api/VendorPercentage/DeleteVendorPercentage/{id}
  DeleteVendorPercentage(id: number): Observable <any> {
    return this.http.delete(`${environment.LIVE}/api/VendorPercentage/DeleteVendorPercentage/${id}`, {
      headers: this.headers,
      responseType: 'json'
    });
  }
}
