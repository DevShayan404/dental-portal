import { Component } from '@angular/core';
import { MasterService } from '../../../service/master.service';
import { MasterSubjectBehaviourService } from '../../../service/master-subject-behaviour.service';
@Component({
  selector: 'app-financial-cost',
  templateUrl: './financial-cost.component.html',
  styleUrls: ['./financial-cost.component.css']
})
export class FinancialCostComponent {
  constructor(private Masterservice:MasterService, private subjectService:MasterSubjectBehaviourService){}

  VendorId!:number
  ngOnInit(): void {
      this.subjectService.GetVendorId().subscribe((vendor:number) =>{
        this.VendorId = vendor;
        if(this.VendorId > 0){
          this.feeType(1);
        // this.getFinancialCostList(this.VendorId);
      }
        console.log("from subject",this.VendorId)
           })

  }


  isTableLoading:boolean=true;
  FinancialCostList:any=[]
  FinancialCostListLength:any
  getFinancialCostList(){
    this.isTableLoading = true;
    this.Masterservice.getFinancialCostByVendorId(this.VendorId).subscribe(response=>{
      this.FinancialCostList = response?.Result;
      this.isTableLoading = false;
      this.FinancialCostListLength = this.FinancialCostList.length;
      console.log("Financial list",this.FinancialCostList);
    })
  }

  VendorFeeTypeByVendorId(){
    this.isTableLoading = true;
    this.Masterservice.VendorFeeTypeByVendorId(this.VendorId).subscribe(response=>{
      this.FinancialCostList = response?.Result;
      this.isTableLoading = false;
      console.log("Vendor type list",this.FinancialCostList);
    })
  }

  TSindex = null;
  toggleStatus:number = 1
  feeType(one: any) {
this.TSindex = one;
this.toggleStatus = 1;
this.getFinancialCostList();
}

feeSlab(two: any) {
  this.TSindex = two;
  this.toggleStatus = 2;
  this.VendorFeeTypeByVendorId()

  }
  
}
