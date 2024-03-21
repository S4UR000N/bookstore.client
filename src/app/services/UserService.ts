import UpdateBooksOnUserRequestModel from "../models/request/UpdateBooksOnUserRequestModel";
import Urls from "../models/urls";
import BookUserIdModel from "../models/user/BookUserIdModel";
import UserModel from "../models/user/UserModel";
import JwtService from "./JwtService";

class UserService {
    static GetUsers(): Promise<UserModel[]> {
        const url = `${Urls.BOOKSTORE}/User/ReadMany`;
        let requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JwtService.getRawToken()}`
            }
        }
        return fetch(url, requestOptions).then(response => response.json().then(res => res.result) as Promise<UserModel[]>);
    }

    static GetUserWithBooksById(): Promise<UserModel> {
        const url = `${Urls.BOOKSTORE}/User/ReadOneById/${JwtService.getJwtToken()?.id}`;
        let requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JwtService.getRawToken()}`
            }
        }
        return fetch(url, requestOptions).then(response => response.json() as Promise<UserModel>);
    }

    static GetBooksUserId(id: number) : Promise<BookUserIdModel[]> {
        const url = `${Urls.BOOKSTORE}/User/ReadUserAndBooksById/${id}`;
        let requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JwtService.getRawToken()}`
            }
        }
        return fetch(url, requestOptions).then(response => response.json() as Promise<BookUserIdModel[]>);
    }

    static PostUpdateBooksOnUser(addRemoveBooks: UpdateBooksOnUserRequestModel) : Promise<boolean> {
        const url = `${Urls.BOOKSTORE}/User/UpdateBooksOnUser`;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JwtService.getRawToken()}`
            },
            body: JSON.stringify(addRemoveBooks)
        };

        return fetch(url, requestOptions).then(res => res.status == 200 ? true : false);
    }
}

export default UserService;