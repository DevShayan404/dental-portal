import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  constructor(private http: HttpClient) {}
  getDealsOnWindow(user:string): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/DealsOnWindow?userName=${user}`);
  }

  getFilterDealsOnWindow(user:string,fromDate:any,toDate:any,dealType:string,statusName:string): Observable<any[]> {
    let x = (environment.HOST + `/api/DealsOnWindow/SearchDealsByAgent/?userName=${user}&fromDate=${fromDate}&toDate=${toDate}&dealType=${dealType}&status=${statusName}`);
    console.log(x)
    return this.http.get<any[]>(environment.HOST + `/api/DealsOnWindow/SearchDealsByAgent/?userName=${user}&fromDate=${fromDate}&toDate=${toDate}&dealType=${dealType}&status=${statusName}`);
  }

  getDealOnWindowAttachment(dealId:number): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/DealOnWindowAttachment?dealId=${dealId}`);
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/OutsourcedUser`);
  }
 
  getBusinesslist(): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/Business`);
  }
  
  getLeaseTypelist(): Observable<any[]> {
    return this.http.get<any[]>(environment.HOST + `/api/LeaseType`);
  }

  postDealsOnWindow(data: {}): Observable<{}> {
    return this.http.post(environment.HOST + `/api/DealsOnWindow`, data, {
      headers: { 'content-type': 'application/json' },
      responseType: 'json',
    });
  }

  uploadFilettachment(Obj: any): Observable<{}> {
    let url =  `${environment.HOST}/api/FileUpload`;
    return this.http.post(url, Obj, {
    });
  }

  DealOnWindowAttachment(Obj: any): Observable<{}> {
    let url =  `${environment.HOST}/api/DealOnWindowAttachment`;
    return this.http.post(url, Obj, {
    });
  }

  updateDealsOnWindow(Obj: any,id:number): Observable<{}> {
    let url =  `${environment.HOST}/api/DealOnWindowAttachment/${id}`;
    return this.http.put(url, Obj, {
    });
  }
}
