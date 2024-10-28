import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PromotionService } from './service/promotion.service';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
  StatusList: any = [{ id: 0, name: 'Active' }, { id: 1, name: 'In Active' }];
  isTableLoading!: boolean ;
  isLoading: boolean = false;
constructor(private service: PromotionService,private messageService: MessageService){}

Status:any
FilterPromotion:any
AllPromoz:any
changeStatus(status:any){
  this.Status = status;
  this.service.getAllPromotion().subscribe(response =>{
    this.isTableLoading = true;
    if (response?.IsSuccess) {
      this.isTableLoading = false;
      this.FilterPromotion = response?.Result;
        this.AllPromoz  = this.FilterPromotion.filter((item:any) => item.Status === status);
      console.log("promotion",this.AllPromoz);
    }
    else {
      this.isTableLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.ErrorMessages[0] });
    }
  })

console.log(this.Status)
}

}
