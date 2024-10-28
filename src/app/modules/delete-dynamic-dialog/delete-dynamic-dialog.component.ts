import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SlotsManagementService } from 'src/app/dashboard/slots-management/services/slots-management.service';
import { ResponseModel } from 'src/app/models/responseModel.interface';

@Component({
  selector: 'app-delete-dynamic-dialog',
  templateUrl: './delete-dynamic-dialog.component.html',
  styleUrls: ['./delete-dynamic-dialog.component.css']
})
export class DeleteDynamicDialogComponent implements OnInit {

  constructor(public config: DynamicDialogConfig, private ref: DynamicDialogRef, private slotService: SlotsManagementService, private messageService: MessageService) { }

  rowId!: number;
  deleteUrlPath!: string;
  ngOnInit(): void {
    let rowData = this.config?.data;
    this.rowId = rowData?.data?.Id;
    this.deleteUrlPath = rowData?.urlPath;
  }

  handleYes() {
    this.slotService.deleteSlot(this.rowId, this.deleteUrlPath).subscribe((response: ResponseModel) => {
      if (response?.IsSuccess) {
        this.slotService.setisFormSubmittedDialog(true);
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.Messages[0] });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });

      }

    })
  }

  handleNo() {
    this.ref.close();
  }

}
