
export interface VendorHospitalInfoModel {
    vendorId? : number;
    doctorId?: number;
}


export interface VendorModel {
vendor: VendorPersonalClinicInfoModel;
}

export interface VendorPersonalClinicInfoModel{
    businessName?: string;
    cityId?: number;
    address1?: string;
    address2?: string;
    lat?: string;
    long?: string;
}
