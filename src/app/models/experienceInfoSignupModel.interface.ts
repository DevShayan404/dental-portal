export interface ExperienceInfoArrayModel {
    itemsArray?: ExperienceInfoModel[];
}

export interface ExperienceInfoModel{
    id? : number;
    hospitalName? : string;
    startDate? : Date;
    endDate? : Date;
    doctorId? : number;
}
