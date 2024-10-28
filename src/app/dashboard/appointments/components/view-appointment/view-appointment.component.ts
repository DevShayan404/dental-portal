import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { VendorserviceService } from 'src/app/dashboard/vendor/services/vendorservice.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { AppointmentsService } from '../../services/appointments.service';
import { DatePipe } from '@angular/common';
import { CitiesServiceService } from 'src/app/dashboard/cities/services/cities-service.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {


  date: any;
  isOpen: boolean = false;
  patientAvailableToggle: any;
  // vendorDoctorList: any;
  isLoading: boolean = true;
  calendarData: any;
  bookedPatientList: any;
  doctorId!: any;
  vendorId!: number;
  timeStampDate: any;
  bookedPatientTitle: any;
  vendorModel: any;
  visible: boolean = false;
  visitedStatusList: any;
  visitedStatusModel: any;
  feesModel: any;
  doctorsList: any;
  doctorModel: any;
  CitiesList: any;
  cityModel: any;
  remarksModel: any;
  vendorsListByCity: any;
  doctorVendorModel: any;
  enableDoctorItem: boolean = true;
  enableHospitalItem: boolean = true;
  adminRole: any = ['Admin']
  operationRole: any = ['Operation']
  hospitalRole: any = ['VendorSuperUser']
  appointmentId: any;
  userId: any;
  updatedById: any;
  updatedRole!: any;
  constructor(
    private appointmentService: AppointmentsService, private cityService: CitiesServiceService, private authService: AuthenticationService,
    private datePipe: DatePipe, private vendorService: VendorserviceService, private messageService: MessageService) {
    this.doctorId = UtilHelpers.getDoctorId();
    if (!this.doctorId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }


  }


  async ngOnInit() {
    const result = await this.authService.decodeTokenFromLocalStorage() as UserModel;
    this.updatedById = result?.nameid;
    this.updatedRole = result?.role!;
    this.visitedStatusList = [{ id: 0, name: 'Non-Visited' }, { id: 1, name: 'Visited' }]

    this.getAllDoctorListByHospital(this.doctorId);
    this.getAllCities();
  }

  handleFunction(data: any) {
    console.log(data)
  }

  handleAppointments(Time: any) {
    this.calendarData.find((x: any) => {
      if (x.Time === Time) {
        this.patientAvailableToggle = x.Time;
        this.getBookedSlotsPatient(this.doctorId, this.vendorId, x.Time);
      }
    })
  }

  getAllDoctorListByHospital(vendorId: number) {
    this.isLoading = true;
    this.vendorService.getDoctorListByVendorId(vendorId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.doctorsList = response.Result;
        this.doctorsList = this.doctorsList[0]?.DoctorVendor;
        this.doctorsList.map((item: any) => {
          item.fullName = item?.Doctor?.InitialName + ' ' + item?.Doctor?.FirstName + ' ' + item?.Doctor?.LastName
        })
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    });
  }


  handleVendorsForCalendar(param: any) {
    const vendorIdFromSelect = param?.VendorId;
    this.vendorId = vendorIdFromSelect;
    const selectedDoctorId = param?.DoctorId;
    this.doctorId = selectedDoctorId;
    // this.bookedPatientTitle = param?.BusinessName;
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy/MM/dd');
    this.timeStampDate = formattedDate;
    this.getSlotsForCalendar(selectedDoctorId, vendorIdFromSelect, this.timeStampDate);
  }

  handleMonthForCalendar(param: any) {
    this.date = new Date(param.year, param?.month - 1, 5);
    const dateFormat = `${param?.year}/${param?.month}/10`;
    this.getSlotsForCalendar(this.doctorId, this.vendorId, dateFormat);
  }

  showAllOptions:boolean = false;
  getSlotsForCalendar(doctorId: number, vendorId: number, date: string) {
    this.isLoading = true;
    this.appointmentService.getBookedSlotsForCalendar(doctorId, vendorId, date).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.calendarData = response?.Result;
        this.showAllOptions =true;
        console.log("calender",this.calendarData)
        if (this.calendarData.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Records Not Found..' });
        }
        this.isLoading = false;
      } else {
        this.calendarData = [];
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    })
  }

  getBookedSlotsPatient(doctorId: number, vendorId: number, date: string) {
    this.isLoading = true;
    this.appointmentService.getBookedPatientDetails(doctorId, vendorId, date).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.bookedPatientList = response?.Result;
        console.log("appointments",this.bookedPatientList);
        this.isLoading = false;
      } else {
        this.bookedPatientList = [];
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    })
  }

  handleStatusChange(appointment: any) {
    this.visitedStatusModel = this.visitedStatusList?.find((x: any) => x.id === appointment?.VisitStatus);
    this.appointmentId = appointment?.Id;
    this.remarksModel = appointment?.DoctorRemarks;
    this.feesModel = appointment?.DoctorFinalFees
    this.visible = true;
  }

  handleUpdatePatientDetails() {

    if (this.visitedStatusModel && this.feesModel && this.remarksModel) {
      const appointmentStatusModel = {
        id: this.appointmentId,
        visitStatus: this.visitedStatusModel.id,
        doctorFinalFees: +this.feesModel,
        doctorRemarks: this.remarksModel,
        updatedBy: +this.updatedById,
        updatedRole: this.updatedRole
      }
      // console.log("obj",appointmentStatusModel)
      if (appointmentStatusModel) {
        this.appointmentService.putAppointmentStatusChange(appointmentStatusModel).subscribe((response: ResponseModel) => {
          if (response?.IsSuccess) {
            // console.log("dr obj change",response)
            this.visible = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.Messages[0] });
            this.patientAvailableToggle = undefined;
            this.appointmentId = undefined;
            this.visitedStatusModel = undefined;
            this.feesModel = undefined;
            this.updatedById = undefined;
            this.updatedById = undefined;
            this.updatedRole = undefined;
            this.remarksModel = undefined;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select the fields..' });

          }
        })
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select the fields..' });

    }
  }


  getAllCities() {
    this.cityService.getAllCities().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.CitiesList = response?.Result;
        this.isLoading = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoading = false;
      }
    })
  }

  changeCityForHospitals(value: any) {
    this.doctorVendorModel = undefined;
    this.getHospitalListByCityId(value.Id);
    this.enableHospitalItem = false;
  }


  getHospitalListByCityId(cityId: number) {
    this.isLoading = true;
    this.vendorService.getVendorsByCity(cityId).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.vendorsListByCity = response?.Result;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
        this.isLoading = false;
      }
    })
  }

  changeHospitalForDoctor(value: any) {
    this.doctorModel = undefined;
    this.getAllDoctorListByHospital(value.Id);
    this.enableDoctorItem = false;
  }

  handleSlotsFilterByAdmin() {
    if (this.CitiesList && this.doctorModel && this.doctorVendorModel) {
      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, 'yyyy/MM/dd');
      this.timeStampDate = formattedDate;
      this.doctorId = this.doctorModel?.DoctorId;
      this.vendorId = this.doctorVendorModel?.Id;
      this.getSlotsForCalendar(this.doctorModel?.DoctorId, this.doctorVendorModel?.Id, this.timeStampDate);

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });

    }
  }



  CalenderTabIndex = null;
  BusinessOnTabClick(index: any) {
    this.CalenderTabIndex = index;
  }


ShowTable:boolean = false;
  OnclickTableoption(){
this.ShowCalender = false;
this.ShowTable = true;
  }
ShowCalender:boolean = true;
  OnclickCalenderoption(){
    this.ShowCalender = true;
    this.ShowTable = false;
  }

}
