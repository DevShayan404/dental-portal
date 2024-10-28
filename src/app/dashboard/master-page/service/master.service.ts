import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  headers = { 'Content-Type': 'application/json-patch+json' };
  constructor(private http: HttpClient) {}

  getAllRoles() {
    let http = `${environment.LIVE}/api/MasterEntry/GetAllRoles`;
    return this.http.get<any>(http);
  }

  getRecordsByRole(roleId: any) {
    let http = `${environment.LIVE}/api/MasterEntry/GetRecordsByRole/${roleId}`;
    return this.http.get<any>(http);
  }

  /////////////////////////////////////
  // getSearchRecord(source:string,Id:number){
  //   let http = `${environment.LIVE}/api/MasterEntry/SearchRecord?source=${source}&Id=${Id}`;
  //   console.log(http);
  //   return this.http.get<any>(http);
  // }
  ////////////////////////////////////////////////////////////////

  getSearchRecord(keyword: string, Id: number) {
    let http = `${environment.LIVE}/api/MasterEntry/GetRecordByKeyword?keyword=${keyword}&roleId=${Id}`;
    return this.http.get<any>(http);
  }

  getDoctorListByVendorId(VendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/GetDoctorListByVendorId?VendorId=${VendorId}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  getDoctorledger(Id: number, start: any, end: any) {
    let http = `${environment.LIVE}/api/MasterEntry/DoctorLedger?doctorId=${Id}&appointmentStartDate=${start}&appointmentEndDate=${end}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  ///////////////////////Patient panel/////////////////////////////////

  getPatientListByVendorId(VendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/GetPatientListByVendorId?VendorId=${VendorId}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  getPateintDetail(patientId: number, vendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/PatientDetailsById?patientId=${patientId}&vendorId=${vendorId}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  /////////////////////////Appointments//////////////////////////////

  getAppointmentsByVendorId(VendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/AppointmentByVendorId?vendorId=${VendorId}`;
    console.log(http);
    return this.http.get<any>(http);
  }

  ////////////////////////Financial Cost/////////////
  getFinancialCostByVendorId(VendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/FinancialInfoByVendorId?vendorId=${VendorId}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  // https://api.dentalbooking.ca/api/MasterEntry/VendorFeeTypeByVendorId?vendorId=2547
  VendorFeeTypeByVendorId(VendorId: number) {
    let http = `${environment.LIVE}/api/MasterEntry/VendorFeeTypeByVendorId?vendorId=${VendorId}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  //////////////Patient Apppotnments/////////////////////
  getPateintAppointmentDetail(patientId: number, toggleStatus: number) {
    let http = `${environment.LIVE}/Patient/GetPatientBacknForth?patientId=${patientId}&toggleStatus=${toggleStatus}`;
    // console.log(http);
    return this.http.get<any>(http);
  }

  //////////////////////New Appointment modaal///////////////////
  GetDoctorAvailableSlots(DoctorId: number, Date: any) {
    let http = `${environment.LIVE}/api/DoctorSlot/GetDoctorAvailableSlots?DoctorVendorId=${DoctorId}&Date=${Date}`;
    console.log(http);
    return this.http.get<any>(http);
  }

  GetPatientSomeoneElse(PatientId: number) {
    let http = `${environment.LIVE}/Patient/GetSomeoneElse?patentId=${PatientId}`;
    console.log(http);
    return this.http.get<any>(http);
  }

  // 'https://api.dentalbooking.ca/api/PatientCardDetail/GetCards?PatientId=1106
  GetPatientCardDetail(PatientId: number) {
    let http = `${environment.LIVE}/api/PatientCardDetail/GetCards?PatientId=${PatientId}`;
    console.log(http);
    return this.http.get<any>(http);
  }

  // https://api.dentalbooking.ca/api/BookAppointment/GetVendorFees?VendorId=2547
  GetVendorFees(VendorId: number) {
    let http = `${environment.LIVE}/api/BookAppointment/GetVendorFees?VendorId=${VendorId}`;
    return this.http.get<any>(http);
  }

  // https://api.dentalbooking.ca/api/MasterEntry/createAppointment
  postcreateAppointment(obj: any): Observable<any> {
    let http = `${environment.LIVE}/api/MasterEntry/createAppointment`;
    // console.log(http)
    return this.http.post(http, obj, {
      headers: this.headers,
      responseType: 'json',
    });
  }

  ///////////////////////////vendor Ledger///////////////////////
  GetcalculateLedger(
    vendorId: number,
    appointmentStartDate: Date,
    appointmentEndDate: Date,
    visitstatus: any
  ): Observable<any> {
    let http = `${environment.LIVE}/api/Vendor/calculateLedger?vendorId=${vendorId}&appointmentStartDate=${appointmentStartDate}&appointmentEndDate=${appointmentEndDate}&visitstatus=${visitstatus}`;
    console.log(http);
    return this.http.get<any>(http);
  }
  ///////////////////////////Doctor Services Fees///////////////////////
  getDoctorServicesFees(id: number): Observable<any> {
    return this.http.get(
      environment.LIVE + `/api/MasterEntry/GetDoctorServicesFeeByVendorId/${id}`
    );
  }
}
