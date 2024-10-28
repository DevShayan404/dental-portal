import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SlotModel } from 'src/app/models/slotModel.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotsManagementService {

  headers = { 'Content-Type': 'application/json-patch+json' };
  private isFormSubmittedDialog$ = new Subject<boolean>();


  constructor(private http:HttpClient) { }

  getSlotByDoctorVendor(doctorVendorId: number, date: string): Observable<any>{
    return this.http.get(`${environment.LIVE}/GetSlots?DoctorVendorId=${doctorVendorId}&Date=${date}`);
  }

  getSlots(doctorVendorId: number): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/DoctorSlot/getDoctorSlots?DoctorVendorId=${doctorVendorId}`);
  }

  addSlot(slotModel: SlotModel): Observable <any> {
    let addSlotUrl = `${environment.LIVE}/api/DoctorSlot/doctorSlotCreation`;

    return this.http.post(addSlotUrl, slotModel, {
      headers: this.headers,
      responseType: 'json'
    });
  }


  updateSlot(slot: any) : Observable<any> {
    let AddServiceURL = `${environment.LIVE}/api/DoctorSlot/updateDoctorSlot/${slot.id}`;

    return this.http.put(AddServiceURL, slot, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  deleteSlot(id: number, url: string): Observable <any> {
    return this.http.delete(`${environment.LIVE}/api/${url}/${id}`, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getAllShifts(): Observable<any>{
    return this.http.get(`${environment.LIVE}/api/Shift/getAllShifts`);
  }

  
  getisFormSubmittedDialog() {
    return this.isFormSubmittedDialog$.asObservable();
  }

  setisFormSubmittedDialog(value: boolean) {
    return this.isFormSubmittedDialog$.next(value);
  }

}
