import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DegreeServiceService {
  private isFormSubmittedDialog$ = new Subject<boolean>();
 
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http:HttpClient) { }

  getAllDegrees(){
    return this.http.get(`${environment.LIVE}/Degree/GetDegrees`);
  }

  AddDegree(degreeModel : any){
    let AddDegreeURL = `${environment.LIVE}/Degree/PostDegree`;
    const params = {
      name:degreeModel?.Name
    }

    return this.http.post(AddDegreeURL,params,{
      headers:this.headers,
      responseType:'json'
    });
  }

  
  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }

  DeleteDegrees(id:number){
    return this.http.delete(`${environment.LIVE}/Degree/deleteDegree/${id}`);
  }

}
