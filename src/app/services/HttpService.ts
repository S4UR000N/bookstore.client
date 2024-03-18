import ResponseModel from "../models/response/ResponseModel";

class HttpService {
    public static async sendRequest<T>(url: string, requestOptions: RequestInit) : Promise<ResponseModel<T | boolean>>
    {
        let res = await fetch(url, requestOptions);

        if (!res.bodyUsed && res.headers.get('Content-Length') === '0') {
            let response = new ResponseModel<boolean>();
            response.statusCode = res.status;
            if (res.status == 200)
            {
                response.result = true;
            }
            else if (res.status == 400)
            {
                response.result = false;
                response.addError("Bad Request", "400 Bad Request.");
            }
            else if (res.status == 404)
            {
                response.result = false;
                response.addError("Not Found", "404 Not Found.");
            }

            return response;
        }

        let response = (await res.json()) as ResponseModel<T>;
        return response;
    }
}

export default HttpService;