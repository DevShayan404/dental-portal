import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeekPipe'
})
export class DayOfWeekPipePipe implements PipeTransform {


  WeekList: any = [{ id: 1, name: 'Sunday' }, { id: 2, name: 'Monday' }, { id: 3, name: 'Tuesday' }, { id: 4, name: 'Wednesday' }, { id: 5, name: 'Thursday' },
  { id: 6, name: 'Friday' }, { id: 7, name: 'Saturday' }];

  transform(id: number): any {
    const response = this.WeekList.find((item:any)=> item?.id === id);
    if(response){
      return response?.name;
    }
    else{
      return id;
    }
    
  }

}
