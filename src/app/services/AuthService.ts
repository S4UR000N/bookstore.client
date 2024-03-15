import RegistrationFormModel from "../models/form/RegistrationFormModel";
import RegistrationRequestModel from "../models/request/RegistrationRequestModel";
import ResponseModel from "../models/response/ResponseModel";
import Urls from "../models/urls";
import HttpService from "./HttpService";

class AuthService {
    static async validateRegistration(rfm: RegistrationFormModel): Promise<ResponseModel<boolean>> {
        let response = new ResponseModel<boolean>();

        Object.keys(rfm).forEach(key => {
            if (!rfm[key]) // empty string / null / undefined
            {
                response.addError(key.toString(), `Can not be empty.`)
            }
        });
          
        if (rfm.password !== rfm.confirmPassword)
        {
            response.addError("Password", "Passwords do not match.");
        }
        if (!!Object.keys(response.errors).length)
        {
            response.result = false;
            response.statusCode = 400;
        }
        else {
            response.result = true;
            response.statusCode = 200;
        }

        return response;
    }

    static async register(rfm: RegistrationFormModel): Promise<ResponseModel<boolean>> {
        return AuthService.validateRegistration(rfm)
        .then(res => {
            console.log("REGISTERRR");

            if (!res.result) {
                return res;
            }
            else {
                let rrm: RegistrationRequestModel = new RegistrationRequestModel(rfm.firstName, rfm.lastName, rfm.email, rfm.password);
    
                const url = `${Urls.BOOKSTORE}/Auth/Register`;
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(rrm)
                };
    
                return HttpService.sendRequest<boolean>(url, requestOptions)
                .then(res2 => res2);
            }
        });
    }
}

export default AuthService;