import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { MessageService } from 'primeng/api';
import { MasterSubjectBehaviourService } from '../../service/master-subject-behaviour.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-by-role',
  templateUrl: './search-by-role.component.html',
  styleUrls: ['./search-by-role.component.css']
})
export class SearchByRoleComponent {
  isTableLoading:boolean = true;
  keyword!:string
item: any;

SetSearchFields!: FormGroup;
  constructor(private fb: FormBuilder,private Masterservice: MasterService,private subjectService:MasterSubjectBehaviourService, private messageService: MessageService){
this.getAllRoles();
this.SetSearchFields = this.fb.group({
  option: ['',Validators.required],
  keyword: ['',Validators.required],
});
  }

//   showValue:any
//   Search(val:any){
// this.showValue = val.value;
//   }

  AllRoles:any
  getAllRoles(){
    this.Masterservice.getAllRoles().subscribe((response:any) => {
      if (response?.IsSuccess) {
        this.AllRoles = response?.Result;
        console.log("allRoles", this.AllRoles)
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
      }
    })
  }

  // RoleId!:number;
  // RoleName!:string;
  // changeRole(role:any){
  //   this.RoleId = role.Id;
  //   this.RoleName = role.roleName;
  //   console.log('change role',this.RoleId,this.RoleName)
  // }


  showlogo:boolean=true;
  SearchRecordList:any=[];
  searchRecordLength:any
  source!:string
  SearchRecord(val:any){
    this.showVendorExpensionPanels = false;
    this.showPatientExpensionPanels= false;
    const keyword = val.value.keyword;
    const RoleId = val.value.option;
    if(this.SetSearchFields.valid){
      this.isTableLoading = true;
      this.showlogo = false;
      this.Masterservice.getSearchRecord(keyword,RoleId).subscribe((response)=>{
        console.log("error",response)
        if (response?.IsSuccess) {
          this.SearchRecordList=response?.Result; 
          this.searchRecordLength = this.SearchRecordList.length;
          
          this.isTableLoading = false;
          this.source = RoleId;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.Messages[0] });
        }
            })
    }else{
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enter keyword & type'});

    }


  }

  showVendorExpensionPanels:boolean = false;

  VendorDetail(item:any){
this.source = '1';
    this.showVendorExpensionPanels = true
this.subjectService.SetVendorId(item.Id);
  }


  showPatientExpensionPanels:boolean = false;
  PatientDetail(item:any){
    this.source = '2';
    this.showPatientExpensionPanels = true;
this.subjectService.SetPatientId(item.Id);
  }

}
