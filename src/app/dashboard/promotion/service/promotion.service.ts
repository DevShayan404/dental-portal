import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { get } from 'jquery';
import { environment } from 'src/environments/environment';
import { Subject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }

  // getLedger(vendorId:any,appointmentDate:any,visitstatus:any){
  //   let Ledger = `${environment.LIVE}/api/Vendor/calculateLedger?vendorId=${vendorId}&appointmentDate=${appointmentDate}&visitstatus=${visitstatus}`;
  //   return this.http.get<any>(Ledger);
  // }

  
   getAllPromotion(){
    let promotion = `${environment.LIVE}/api/Promotions/GetAllPromotions`;
    return this.http.get<any>(promotion);
  }
}
