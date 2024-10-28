import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseModel } from 'src/app/models/responseModel.interface';
import { MessageService } from 'primeng/api';
import { UtilHelpers } from 'src/app/core/utils/utils.component';
import { DoctorModel } from 'src/app/models/doctorModel';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-view-list',
  templateUrl: './user-view-list.component.html',
  styleUrls: ['./user-view-list.component.css']
})
export class UserViewListComponent implements OnInit {

  isTableLoading: boolean = true;
  isLoading: boolean = true;
  doctorId: any;
  displayedColumns: string[] = ['Name', 'Email', 'Contact', 'CreatedOn'];
  dataSource!: MatTableDataSource<DoctorModel>;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  ref!: DynamicDialogRef;

  // adminRole: any = ['Admin']
  // doctorRole: any = ['Doctor']
  allUserOperationList: any;

  constructor(private userService: UserService,
    private messageService: MessageService, private dialogService: DialogService,
  ) {

    this.doctorId = UtilHelpers.getDoctorId();
    if (!this.doctorId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in Doctor Id Please Login Again..' });
      // localStorage.removeItem('userId');
    }
  }

  ngOnInit(): void {
    this.userService.getisFormSubmittedDialog().subscribe((response: any) => {
      this.ref?.close();
      this.getAllUserOperationList();
    })
    this.getAllUserOperationList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllUserOperationList() {
    this.userService.getAllUserOperationsList().subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.allUserOperationList = response?.Result;
        this.dataSource = new MatTableDataSource<any>(this.allUserOperationList);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        setTimeout(() => {
          this.isLoading = false;
          this.isTableLoading = false;
        }, 2000);

      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.ErrorMessages[0] });

      }
    })
  }

  handleAddEditUserOperation(row: any) {
    this.ref = this.dialogService.open(AddEditUserComponent, {
      data: { data: row },
      header: 'User/Operation', width: '50%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000,
    });
  }
}
