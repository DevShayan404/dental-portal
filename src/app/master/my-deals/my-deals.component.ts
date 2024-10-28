import {Component,ElementRef, ViewChild,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealsService } from './deals.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';
interface DecodedToken {
  unique_name: string;
  given_name: string;
  family_name: string;
  actort: string;
  nbf: number;
  exp: number;
  iat: number;
}
@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.component.html',
  styleUrl: './my-deals.component.css',
})
export class MyDealsComponent {
  @ViewChild('inputFile') myInputVariable!: ElementRef;
  formData!: FormGroup;
  filterData!: FormGroup;
  listOfOption: string[] = [];
  businessList: any = [];
  leaseTypeList: any = [];
  dealsList: any = [];
  localStorageObject!: DecodedToken;
  search: any;
  loginAgentId!: number;
  date = null;

  constructor(
    private dealService: DealsService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private datePipe: DatePipe
  ) {
    const localStorageItem = localStorage.getItem('decodeToken');
    const x = localStorage.getItem('agentId');
    this.loginAgentId = Number(x);
    if (localStorageItem) {
      this.localStorageObject = JSON.parse(localStorageItem);
      this.GetDealonWinList(this.localStorageObject.unique_name);
    }
  }

  dealType = [
    { id: 1, name: 'New Merchant' },
    { id: 2, name: 'New sight' },
    { id: 3, name: 'New Terminal' },
    { id: 3, name: 'Swap Processor' },
  ];
  Status = [
    {'status':'Pending'},
    {'status':'Done'}
  ]

  ngOnInit(): void {
    this.formData = this.fb.group({
      businessTypeId: [null, Validators.required],
      posDealTypeId: [null, Validators.required],
      businessName: [null, Validators.required],
      leaseTypeId: [null, Validators.required],
      remarks: [null, Validators.required],
    });
    this.filterData = this.fb.group({
      fromdate: [null, Validators.required],
      Todate:[null, Validators.required],
      DealTypeId: [null, Validators.required],
      status: [null, Validators.required],
    });
    this.GetAllLists();
  }
  GetAllLists() {
    this.dealService.getLeaseTypelist().subscribe((res: any) => {
      const AddNa = [{ id: 0, name: 'NA' }, ...res];
      this.leaseTypeList = AddNa;
    });
    this.dealService.getBusinesslist().subscribe((res: any) => {
      this.businessList = res;
    });
  }

  DealOnWinList: any = [];
  GetDealonWinList(userName: string) {
    this.dealService.getDealsOnWindow(userName).subscribe((res: any) => {
      this.DealOnWinList = res;
      console.log("Deal",res)
    });
  }

  SearchDealOnWindows(filterData:any){
  console.log(filterData.value.fromdate);
    const username = this.localStorageObject.unique_name;
   const fromDate = this.datePipe.transform(filterData.value.fromdate, 'yyyy-MM-dd');
   const  toDate= this.datePipe.transform(filterData.value.Todate, 'yyyy-MM-dd');
   const  dealType= filterData.value.DealTypeId;
   const  statusName= filterData.value.status;

    this.dealService.getFilterDealsOnWindow(username,fromDate,toDate,dealType,statusName).subscribe((res:any)=>{
      this.DealOnWinList = res;
      console.log(res);
    })
  }

  editRefNo(item: any) {
    item.isEdit = true;
  }

  closeIcon(item: any) {
    item.isEdit = false;
  }

  updateRefNo(event: any, item: any) {
    const value = event.target.value;
  }

  updateDealOnWin(item: any) {
    const date = new Date();
    const dealObj = {
      id: 0,
      createdBy: 0,
      createdAt: date,
      updatedBy: 0,
      updatedAt: date,
      businessTypeId: 0,
      businessName: 'string',
      agentId: 0,
      createdByFlag: 0,
      attachedDealId: 0,
      posDealTypeId: 0,
      leaseTypeId: 0,
      agentOfficeId: 0,
      agentTypeId: 0,
      remarks: 'string',
    };
    console.log('updateDeal', dealObj);
  }

  activeAddItem!: boolean;
  addItemSection(): void {
    this.activeAddItem = !this.activeAddItem;
    this.activeFilter = false;
    this.formData.reset();
  }

  activeFilter!: boolean;
  addFilterSection(): void {
    this.activeFilter = !this.activeFilter;
    this.activeAddItem = false;
  }

  addFilter(){
    console.log("filterData",this.filterData.value);
  }

  addDeal(): void {
    const date = new Date();
    const dealObj = {
      id: 0,
      createdBy: this.loginAgentId,
      createdAt: date,
      updatedBy: this.loginAgentId,
      updatedAt: date,
      agentId: this.loginAgentId,
      ...this.formData.value,
    };
    this.dealService.postDealsOnWindow(dealObj).subscribe((res: any) => {
      this.formData.reset();
      this.message.create('success', `Deal added successfully`);
      this.GetDealonWinList(this.localStorageObject.unique_name);
    });
  }
  cancelAddItem(): void {
    this.activeAddItem = false;
  }
  ////////MODAL DATA///////////
  isVisible = false;
  showModal(item: any): void {;
    this.dealOnWinId = item.id;
    this.GetAllAttachmentList(this.dealOnWinId);
    this.isVisible = true;
  }

  AllAttachmentList: any = [];
  GetAllAttachmentList(dealID: number) {
    this.dealService.getDealOnWindowAttachment(dealID).subscribe((res: any) => {
      this.AllAttachmentList = res;
    });
  }

  dealOnWinId!: number;
  fileData: any;
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.fileData = file;
  }
  SubmitAttach() {
    if (this.fileData) {
      const formData = new FormData();
      formData.append('model', this.fileData);
      this.dealService.uploadFilettachment(formData).subscribe((res: any) => {
        const attachObj = {
          id: 0,
          dealOnWindowId: this.dealOnWinId,
          fileName: res.fileName,
          physicalFileName: res.fileName,
        };
        this.dealService
          .DealOnWindowAttachment(attachObj)
          .subscribe((res: any) => {
            this.GetAllAttachmentList(this.dealOnWinId);
            this.myInputVariable.nativeElement.value = '';
            this.fileData = '';
            this.message.create('success', `File uploaded successfully`);
          });
      });
    } else {
      this.message.create('error', `No file selected`);
    }
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
