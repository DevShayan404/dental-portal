import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  headers = { 'Content-Type': 'application/json-patch+json' };
  private isFormSubmittedDialog$ = new Subject<boolean>();


  constructor(private http:HttpClient) { }

  getBookedSlotsForCalendar(doctorId: number, vendorId : number, Date: any): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/BookAppointment/GetBookAppointmentSingleMonthByDoctorId?DoctorId=${doctorId}&VendorId=${vendorId}&timeStamp=${Date}`)
  }

  getBookedPatientDetails(doctorId: number, vendorId : number, Date: any): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/BookAppointment/GetBookAppointmentPatientDetailsByDoctorId?DoctorId=${doctorId}&VendorId=${vendorId}&timeStamp=${Date}`)
  }

  getBookedAppointmentByVisitStatus(Date: string, visitStatus : number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/BookAppointment/GetBookAppointmentByVisitStatus?timestamp=${Date}&visitStatus=${visitStatus}`)
  }

  putAppointmentStatusChange(appointmentStatus: any): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/BookAppointment/updateBookAppointment`;
    return this.http.put<any>(url, appointmentStatus).pipe(
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

  putAppointmentByOperation(appointmentStatus: any): Observable<ResponseModel> {
    let url = `${environment.LIVE}/api/BookAppointment/updateBookAppointmentByOperation`;
    return this.http.put<any>(url, appointmentStatus).pipe(
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

}
