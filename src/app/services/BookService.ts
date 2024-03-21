import BookFormModel from "../models/form/BookFormModel";
import Urls from "../models/urls";
import JwtService from "./JwtService";

class BookService {
    static PostUpdateBooksOnUser(form: BookFormModel) : Promise<boolean> {
        const url = `${Urls.BOOKSTORE}/Book`;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JwtService.getRawToken()}`
            },
            body: JSON.stringify(form)
        };

        return fetch(url, requestOptions).then(res => res.status == 201 ? true : false);
    }
}

export default BookService;