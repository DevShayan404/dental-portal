import { Component, OnInit } from '@angular/core';
import { DoctorsServiceService } from '../../services/doctors-service.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  date: any;
  isOpen: boolean = false;
  patientAvailableToggle: any;
  vendorDoctorList: any;
  isLoading: boolean = true;
  calendarData: any;
  doctorId!: any;
  vendorId: number = 1;
  date2: any = '2023/08/11'
  bookedPatientTitle: any;
  vendorModel: any;
  constructor(private doctorService: DoctorsServiceService, private messageService: MessageService) { 
    this.doctorId = UtilHelpers.getDoctorId();
    if (!this.doctorId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
  }


  ngOnInit(): void {
    // this.getVendorListByDoctorId(this.doctorId);
    // this.getSlotsForCalendar(this.doctorId, this.vendorId, this.date2);

  }

  // handleFunction(data: any) {
  //   console.log(data)
  // }

  // appointments: any[] = [
  //   {
  //     day: 5,
  //     month: 6,
  //     year: 2023,
  //     doctorName: 'Dr. Saad Malik',
  //     patientName: 'Dr. Saad Malik',
  //     time: '06:30',
  //     start: new Date(2023, 5, 22, 10, 0),
  //     end: new Date(2023, 5, 22, 12, 0)
  //   },
  //   {
  //     day: 8,
  //     month: 7,
  //     year: 2023,
  //     doctorName: 'Dr. Shayaan',
  //     patientName: 'Dr. Saad Malik',
  //     time: '06:30',
  //     start: new Date(2023, 5, 23, 14, 0),
  //     end: new Date(2023, 5, 23, 16, 0)
  //   },
  // ];

  // handleAppointments(Time: any) {
  //   this.calendarData.find((x: any) => {
  //     if (x.Time === Time) {
  //       this.patientAvailableToggle = x.Time;
  //     }
  //   })
  // }

  // getVendorListByDoctorId(doctorId: number) {
  //   this.isLoading = true;
    // this.doctorService.getAllVendorsByDoctor(doctorId).subscribe((response: ResponseModel) => {
    //   if (response?.IsSuccess) {
    //     this.vendorDoctorList = response?.Result;
    //     this.vendorId = this.vendorDoctorList[0]?.Id;
    //     // this.vendorModel = this.vendorDoctorList[0];
    //     this.isLoading = false;
    //   }
    //   else{
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0]});

    // }
    // });
  }

  // handleVendorsForCalendar(param: any) {
  //   const vendorIdFromSelect = param?.Id;
  //   this.bookedPatientTitle = param?.BusinessName;
  //   this.getSlotsForCalendar(this.doctorId, vendorIdFromSelect, this.date2);
  // }

  // handleMonthForCalendar(param: any) {
  //   this.date = new Date(param.year, param?.month - 1, 5);
  //   const dateFormat = `${param?.year}/${param?.month}/10`;
  //   this.getSlotsForCalendar(this.doctorId, this.vendorId, dateFormat)
  // }
  // getSlotsForCalendar(doctorId: number, vendorId: number, date: string) {
  //   this.isLoading = true;
  //   this.doctorService.getBookedSlotsForCalendar(doctorId, vendorId, date).subscribe((response: ResponseModel) => {
  //     if (response?.IsSuccess) {
  //       this.calendarData = response?.Result;
  //       this.isLoading = false;
  //     } else {
  //       this.calendarData = [];
  //         this.isLoading = false;
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
  //     }
  //     // let res: any = response;
  //     // if (res?.length > 0) {
  //     //   this.calendarData = response;
  //     //   this.isLoading = false;
  //     // }
  //     // else {
  //     //   this.calendarData = [];
  //     //   this.isLoading = false;
  //     // }

  //   })
  // }

// }
