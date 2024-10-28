export class UtilHelpers {

    static getDoctorId(): number | undefined {
        try {
            const doctorAtob: string = localStorage.getItem('userId')!;
            const response = +window.atob(doctorAtob);
            // console.log("utilPkaages",response)
            return response;
        }
        catch (error) {
            localStorage.removeItem('userId');
        }
    }

}