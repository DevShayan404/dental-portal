import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class MasterSubjectBehaviourService {
  private VendorId$ = new BehaviorSubject<number>(0);

  public GetVendorId() {
    return this.VendorId$.asObservable();
   }
 
   public SetVendorId(data:any) {
     this.VendorId$.next(data);
   }

   
   private PatientId$ = new BehaviorSubject<number>(0);

  public GetPatientId() {
    return this.PatientId$.asObservable();
   }
 
   public SetPatientId(data:any) {
     this.PatientId$.next(data);
   }


  constructor() { }
}
