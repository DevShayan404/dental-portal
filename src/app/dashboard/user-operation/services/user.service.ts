import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { UserOperationModel } from 'src/app/models/userOperationModel.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isFormSubmittedDialog$ = new Subject<boolean>();
  
  headers = { 'Content-Type': 'application/json-patch+json' };

  constructor(private http:HttpClient) { }

  getAllUserOperationsList(): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Operations/GetAllOperations`);
  }

  addUserOperation(userOperation: UserOperationModel): Observable <any> {
    let addUserUrl = `${environment.LIVE}/api/Operations/CreateOperationsByAdmin`;
    return this.http.post(addUserUrl, userOperation, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }
}
