import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { MasterService } from '../../service/master.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MasterSubjectBehaviourService } from '../../service/master-subject-behaviour.service';
@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent {
  closemessage = 'this is close message';
  inputdata: any;
  SetFeeForm!: FormGroup;
  LoginUSerObj: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private SubjectService:MasterSubjectBehaviourService,
    private MasterService: MasterService,
    private ref: MatDialogRef<AppointmentModalComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cityService: CitiesServiceService,
    private vendorService: VendorserviceService,
    private messageService: MessageService,
    private formbuilder: FormBuilder,
  ) {

   
    // const x: string = localStorage.getItem('LoginUSer')!;
    // this.LoginUSerObj = JSON.parse(window.atob(x));

    this.getAllCities();
    // this.dateFormat();
  }

  

  CitiesList: any;
  getAllCities() {
    this.cityService.getAllCities().subscribe((response: any) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
        // console.log(this.CitiesList)
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.ErrorMessages[0],
        });
      }
    });
  }

  cityId: any;
  changeCity(city: any) {
    this.cityId = city;
    this.getVendorsListByCityId(this.cityId);
  }

  vendorsListByCity: any;
  getVendorsListByCityId(cityId: number) {
    this.vendorService.getVendorsByCity(cityId).subscribe((response: any) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.ErrorMessages[0],
        });
      }
    });
  }

  vendorId!:number;
  changeVendor(val:any){
    this.vendorId = val;
    // console.log(this.vendorId);
    this.getDoctorList(this.vendorId);
    this.getVendorFee(this.vendorId);
  }

  VendorFee:any
  getVendorFee(vendorId:number){
    this.MasterService.GetVendorFees(vendorId).subscribe(response=>{
      if (response?.IsSuccess) {
        console.log(response)
       
        if(response?.Result.length > 0 ){
          this.VendorFee = response?.Result[0].Amount;   
        }else{
          this.VendorFee = 0.00;
          this.messageService.add({
            severity: 'info',
            summary: 'info',
            detail: 'hospital fee is not available (First set fee then add appointment)',
          });
        }
      }
    })

  }




  AllDoctorList:any=[]
getDoctorList(vendor:number){
  this.MasterService.getDoctorListByVendorId(vendor).subscribe(response=>{
    console.log("dr list",response);
    this.AllDoctorList = response?.Result;
  })
}

doctorId!:number
changeDoctor(val:any){
  this.doctorId = val.DoctorId;
  console.log("this.doctorId",this.doctorId);
  this.GetDoctorSlots();
}

formattedDate: any;
currentDate = new Date();
dateFormat(date:Date) {
  this.formattedDate =
    this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
    return this.formattedDate;
}

ShowDate:boolean = false;
ShowSLot:boolean = false;
SlotDate:any;
FilterSlotDates:any=[]
GetDoctorSlots(){
  this.SlotTime = [];
  this.ShowCard = false;
  const Date = this.dateFormat(this.currentDate);
  // console.log(Date , this.doctorId );
  this.MasterService.GetDoctorAvailableSlots(this.doctorId,Date).subscribe(response=>{
    if (response?.IsSuccess) {
      this.SlotDate  =  response?.Result;
      // console.log("slot date",this.SlotDate);
      if(this.SlotDate.length == 0){
        this.ShowDate = false;
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: 'No data found',
        });
      }else if(this.SlotDate.length > 0){
        this.ShowDate = true;
        const x = this.getUniqueDates();
        this.FilterSlotDates = x; 
        // console.log("Filtr slot",this.FilterSlotDates);
      }
    } else {
      this.ShowDate = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: response?.ErrorMessages[0],
      });
    }
  });
}


UniqueDate:any=[]
getUniqueDates() {
  this.UniqueDate = []
  const datearray =  Array.from(new Set(this.SlotDate.map((appointment:any) => new Date(appointment.Appointment).toLocaleDateString('en-US'))));
  const x = datearray.map((value:any)=>{
  const momentDate = moment(value, 'MM/DD/YYYY');
  const formattedDate = momentDate.format('YYYY-MM-DD');
   this.UniqueDate.push(formattedDate);
  })
  return this.UniqueDate;
}


SlotTime:any = []
  handleAppointments(selectedDate: string) {
const date = this.FormateDateTime(selectedDate);
// console.log(`Modified Date String: ${selectedDate}`);
this.MasterService.GetDoctorAvailableSlots(this.doctorId,date).subscribe(response=>{
  if (response?.IsSuccess) {
    this.SlotDate  =  response?.Result;
    if(this.SlotDate.length == 0){
      this.ShowDate = false;
      this.messageService.add({
        severity: 'info',
        summary: 'info',
        detail: 'No data found',
      });
    }else if(this.SlotDate.length > 0){
      this.ShowDate = true;
      // console.log("this.SlotDate before filter",this.SlotDate);
      const x = this.getUniqueDates();
      this.FilterSlotDates = x; 
      // console.log("this.SlotDate after filter",this.FilterSlotDates);


      this.SlotTime = this.FilterSlotTime(selectedDate);
    // console.log("SLotTime",this.SlotTime);
    this.ShowSLot = true;
    this.GetPatientCardDetail();
    }
   
  } else {
    this.ShowDate = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: response?.ErrorMessages[0],
    });
  }
});

  }

  FilterSlotTime(selectedDate:any){
    const filteredAppointments = this.SlotDate.filter((appointment:any) => {
    const appointmentDate = new Date(appointment.Appointment).toLocaleDateString();
    const targetDate = new Date(selectedDate).toLocaleDateString();
      return appointmentDate === targetDate;
  })
  return filteredAppointments;
}

  FormateDateTime(selectedDate:any){
    const originalDate = new Date(selectedDate);
    const formattedDate = this.datePipe.transform(originalDate, 'yyyy-MM-dd');
    const currentDate = new Date();
    const currentHour = this.padNumber(currentDate.getHours(), 2);
    const currentMinute = this.padNumber(currentDate.getMinutes(), 2);
    const currentSecond = this.padNumber(currentDate.getSeconds(), 2);
    const finalReuslt = `${formattedDate}T${currentHour}:${currentMinute}:${currentSecond}`;
    // const modifiedDateString = finalReuslt.replace(/\//g, '-');
    return finalReuslt;
  }

 private padNumber(value: number, length: number): string {
  return value.toString().padStart(length, '0');
}
 
  

SomeOneElseList:any = [];
GetPatientSomeoneElse(PatientId:number){
  this.MasterService.GetPatientSomeoneElse(PatientId).subscribe(res=>{
    if (res?.IsSuccess) {
      this.SomeOneElseList  =  res?.Result;
      // console.log("someoneWlse",this.SomeOneElseList)
    }
  })
}

ShowCard:boolean = false;
AppointmentDateTime:any
GetSlotTime(Appointment:any){
  this.AppointmentDateTime = Appointment;
  console.log("Final appointment",Appointment)
this.ShowCard = true;
}

cardList:any=[]
GetPatientCardDetail(){
  this.MasterService.GetPatientCardDetail(this.PatientId).subscribe(res=>{
    if (res?.IsSuccess) {
      this.cardList  =  res?.Result;
      console.log("CardDetail",this.cardList)
    }
  })
}

relationID:any
getRelation(rel:any){
this.relationID = rel.Id;
  console.log('relation',this.relationID);
  }
  
  cardDetail:any = {}; 
  selectedCard!: number | null;
  selectCard(data: any) {
    this.selectedCard = data.Id;
    this.cardDetail = data;
    // console.log("card",data)
  }


creditCartForm = this.formbuilder.group({
  cartHolderName: [null, [Validators.required]],
  cartNumber: [null, [Validators.required]],
  mmyy: [null, [Validators.required]],
  cvv: [null, [Validators.required]],
});




cardFormOpen!: boolean;
openCardForm() {
  this.cardFormOpen = !this.cardFormOpen;
  if (this.cardFormOpen === true) {
    this.selectedCard = null;
  }
}

onMMYYInput(event: any) {
  const input = event.target as HTMLInputElement;
  let mmYY = input.value.replace(/\s/g, '').replace(/\//g, '');
  const regex = /^[0-9]*$/;

  if (!regex.test(mmYY)) {
    mmYY = mmYY.replace(/[^0-9]/g, '');
    input.value = this.formatMMYY(mmYY);
  } else {
    input.value = this.formatMMYY(mmYY);
  }
}

formatMMYY(mmYY: string): string {
  if (mmYY.length > 2) {
    mmYY = mmYY.slice(0, 2) + '/' + mmYY.slice(2);
  }
  return mmYY;
}

cartSave: boolean = false;
saveCartId: number = 0;
spinner: boolean = false;
saveCart() {
  this.cartSave = !this.cartSave;
  if (this.cartSave === true) {
    this.saveCartId = 1;
  } else {
    this.saveCartId = 0;
  }
}

submitCreditCartForm(value:any){}

PatientId!:number
  ngOnInit(): void {
    this.inputdata = this.data;
    this.SubjectService.GetPatientId().subscribe((Id:number) =>{
      this.PatientId = Id;
      if(this.PatientId > 0){
      this.GetPatientSomeoneElse(this.PatientId);
    
    }
      // console.log("from subject patient",this.PatientId)
         })
  }



  CalenderTabIndex = null;
DateOnTabClick(index: any) {
  this.CalenderTabIndex = index;
}

SlotTabIndex = null;
SlotOnTabClick(index: any){
  this.SlotTabIndex = index;
}
  closepopup() {
    this.ref.close('closed');
  }
  savedata() {
  const finalObj =  {
      "doctorVendorId": this.doctorId,
      "patientId":this.relationID,
      "appointment": this.AppointmentDateTime,
      "initialFees": this.VendorFee,
      "patientCardDetail": {
        "id": this.cardDetail.Id,
        "patientId": this.cardDetail.PatientId,
        "cardNumber": this.cardDetail.CardNumber,
        "cardHolderName": this.cardDetail.CardHolderName,
        "cvv": this.cardDetail.CVV,
        "cardType": this.cardDetail.CardType,
        "expiry": this.cardDetail.Expiry
      },
      "parentId": this.PatientId
    }

    console.log("Final obj",finalObj);
    const isObjectValid = this.validateObject(finalObj);

if (isObjectValid) {
  this.MasterService
        .postcreateAppointment(finalObj)
        .subscribe((response) => {
          if (response?.IsSuccess) {
            this.closepopup();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: response?.Messages[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.ErrorMessages[0],
            });
          }
        });
} else {
  this.messageService.add({
    severity: 'info',
    summary: 'info',
    detail: 'Fill all fields (Card selection is optional)',
  });
}

   
    }

    validateObject(obj: any): boolean {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            return false; // Return false if any field is empty or null
          }
        }
      }
      return true; // Return true if all fields are filled
    }
  }







  

