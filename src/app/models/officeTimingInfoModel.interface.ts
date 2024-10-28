export interface OfficeTimingInfoArrayModel {
    itemsArray?: OfficeTimingInfoModel[];
}

export interface OfficeTimingInfoModel{
    Id?:number;
    dayOfWeek? : number;
    startTime? : any;
    endTime? : any;
    vendorId? : any;
    isStatus?: number;
}
