import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { get } from 'jquery';
import { environment } from 'src/environments/environment';
import { Subject, Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }


  
  getLedger(vendorId:any,start:any,end:any,visitstatus:any){
    let Ledger = `${environment.LIVE}/api/Vendor/calculateLedger?vendorId=${vendorId}&appointmentStartDate=${start}&appointmentEndDate=${end}&visitstatus=${visitstatus}`;
    return this.http.get<any>(Ledger);
  }

}
