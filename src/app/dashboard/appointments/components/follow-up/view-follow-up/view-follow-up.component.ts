import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorModel } from 'src/app/models/doctorModel';
import { UserService } from 'src/app/dashboard/user-operation/services/user.service';
import { AddEditUserComponent } from 'src/app/dashboard/user-operation/components/add-edit-user/add-edit-user.component';
import { AppointmentsService } from '../../../services/appointments.service';
import { DatePipe } from '@angular/common';
import { AddEditFollowUpComponent } from '../add-edit-follow-up/add-edit-follow-up.component';

@Component({
  selector: 'app-view-follow-up',
  templateUrl: './view-follow-up.component.html',
  styleUrls: ['./view-follow-up.component.css']
})
export class ViewFollowUpComponent implements OnInit {


  isTableLoading: boolean = false;
  isLoading: boolean = false;
  doctorId: any;
  userId: any;
  displayedColumns: string[] = ['DoctorName', 'PatientName', 'PatientPhoneNumber', 'Appointment', 'HopsitalName', 'finalFees', 'Remarks', 'VisitStatus', 'Actions'];
  dataSource!: MatTableDataSource<DoctorModel>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  ref!: DynamicDialogRef;
  visible: boolean = false;
  // adminRole: any = ['Admin']
  // doctorRole: any = ['Doctor']
  allFollowUpList: any;
  date: any;
  timeStampDate: any;
  visitStatusModel: any;
  visitStatusList: any = [{ id: 0, name: 'Non-Visited' }, { id: 1, name: 'Visited' }]
  remarks: any;


  constructor(private appointmentService: AppointmentsService, private datePipe: DatePipe,
    private messageService: MessageService, private dialogService: DialogService,
  ) {

    this.userId = UtilHelpers.getDoctorId();
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
  }

  ngOnInit(): void {

    this.appointmentService.getisFormSubmittedDialog().subscribe((response: any) => {
      this.ref?.close();
      this.getallFollowUpList();

    })

    if (this.setDateOnInit() && this.setVisitStatusOnInit()) {
      this.getallFollowUpList();
    }
  }

  setDateOnInit() {
    const currentDate = new Date();
    const previous = new Date(currentDate.getTime());
    previous.setDate(currentDate.getDate() - 1);
    const date = this.datePipe.transform(previous, 'yyyy/MM/dd');
    this.date = date;

    return this.date;
  }

  setVisitStatusOnInit() {
    this.visitStatusModel = this.visitStatusList.find((item: any) => item?.id === 1);

    return this.visitStatusModel;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getallFollowUpList() {
    if (this.visitStatusModel && this.date) {
      this.isLoading = true;
      this.isTableLoading = true;
      const formattedDate = this.datePipe.transform(this.date, 'yyyy/MM/dd');
      this.timeStampDate = formattedDate;
      this.appointmentService.getBookedAppointmentByVisitStatus(this.timeStampDate, this.visitStatusModel?.id).subscribe((response: ResponseModel) => {
        if (response?.IsSuccess) {
          this.allFollowUpList = response?.Result;
          if (this.allFollowUpList?.length > 0) {
            this.dataSource = new MatTableDataSource<any>(this.allFollowUpList);
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
            setTimeout(() => {
              this.isLoading = false;
              this.isTableLoading = false;
            }, 2000);
          }
          else {
            this.dataSource = new MatTableDataSource<any>([]);
            this.isLoading = false;
            this.isTableLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Records not found..' });

          }
        }
        else {
          this.dataSource = new MatTableDataSource<any>([]);
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

        }
      })
    }
    else {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select all values..' });

    }
  }

  handleAddEditFollowUpOperation(row: any) {
    this.ref = this.dialogService.open(AddEditFollowUpComponent, {
      data: { data: row },
      header: 'Follow up', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }

  handleSlotsFilterByAdmin() {

  }

  handleViewRemarksInfo(data: any){
    if(data){
      this.visible = true;
    this.remarks = data?.DoctorRemarks;
    }
  } 
}
