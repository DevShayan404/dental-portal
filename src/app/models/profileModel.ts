import { EducationInfoModel } from "./educationInfoSignupModel.interface";
import { ExperienceInfoModel } from "./experienceInfoSignupModel.interface";

export interface ProfileModel {
    Id?: number;
    InitialName?: string,
    FirstName?: String,
    LastName?: string,
    Fees?: number,
    Number?: string,
    Gender?: string,
    Email?: string,
    Contact1?: string,
    Contact2?: string,
    Status?: number,
    Educations: EducationInfoModel[];
    Experiences: ExperienceInfoModel[];
    DoctorVendors: DoctorVendors[];

}

export interface DoctorVendors {
    Vendor: Vendor;
    DoctorServices: Services;
}

export interface Vendor{
    BusinessName?: string;
    cityId?: number;
    Address1?: string;
    Address2?: string;
    Lat?: string;
    Long?: string;
}



export interface Services {
    Name?: string;
    Fees? : number;
    Discount? : number;
    FixedPercentage? : number;
    Services: ServicesModel;
}




export interface DoctorVendors {
    Id: number,
    DoctorId: number,
    VendorId: number,
}



export interface ServicesModel {
    Name?: string;
    Fees?: number;
}

