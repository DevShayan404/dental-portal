import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceServiceService {
 
  private isFormSubmittedDialog$ = new Subject<boolean>();
  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }

  GetAllProvince(){
    return this.http.get(`${environment.LIVE}/Province/GetProvinces`);
  }

  GetAllProvinceNew(){
    return this.http.get(`${environment.LIVE}/Province/GetAllProvinces`);
  }

  AddProvince(provinceModel : any){
    let AddProvinceURL = `${environment.LIVE}/Province/PostProvince`;
    const params = {
      name:provinceModel?.Name
    }

    return this.http.post(AddProvinceURL,params,{
      headers:this.headers,
      responseType:'json'
    });
  }


  // /Province/updateProvince/21
  // updateProvince(ProvinceModel: any)  {
  //   let AddServiceURL = `${environment.LIVE}/Province/updateProvince/${ProvinceModel.Id}`;

  //   const params = {
  //     serviceId: ProvinceModel?.ServiceId,
  //     name: ProvinceModel?.Name,
  //     fees: ProvinceModel?.Fees | 0
  //   };

  //   console.log("update",params)

  //   return this.http.put(AddServiceURL, params, {
  //     headers: this.headers,
  //     responseType: 'json'
  //   });
  // }

  DeleteProvince(id:number){
    return this.http.delete(`${environment.LIVE}/Province/deleteProvince/${id}`);
  }

  
  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }
  
}
