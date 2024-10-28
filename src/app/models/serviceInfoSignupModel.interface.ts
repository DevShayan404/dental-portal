export interface ServiceInfoArrayModel {
    itemsArray?: ServiceInfoModel[];
}

export interface ServiceInfoModel {
    id?: number;
    serviceId? : number;
    doctorVendorId?: number;
    fees? : number;
    discount? : number;
    fixedPercentage? : number;
    name?: string;
}

