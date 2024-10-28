export interface ResponseModel {
    StatusCode: number;
    IsSuccess: boolean;
    ErrorMessages: string[];
    Messages: string[];
    Result: any;
    Password? : any;
}