export interface EducationInfoArrayModel {
    itemsArray?: EducationInfoModel[];
}



export interface EducationInfoModel {
    eduId?: number;
    degreeId? : number;
    startDate? : Date;
    endDate? : Date;
    doctorId? : number;
    Degree?: DegreeModel;
}

export interface DegreeModel {
   Name?: string;
}