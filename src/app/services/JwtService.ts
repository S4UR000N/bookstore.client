'use client'
import { jwtDecode } from "jwt-decode";
import UserJwtTokenModel from "../models/user/UserJwtTokenModel";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'


class JwtService {
    static decodeJwt(jwtToken: string): UserJwtTokenModel {
        return jwtDecode<UserJwtTokenModel>(jwtToken);
    }

    static setJwtToken(ujtm: UserJwtTokenModel) {
        setCookie('currentUser', UserJwtTokenModel.encodeString(ujtm), {expires: new Date(+ujtm.exp * 1000)});
    }

    static getJwtToken(): UserJwtTokenModel | null {
        let token = UserJwtTokenModel.decodeString(getCookie("currentUser"))?.expToDate();
        if (token) {
            return token;
        }
        return null;
    }

    static unsetJwtToken(): void {
        removeCookie('currentUser');
    }

    static handleJwt(jwtToken: string) {
        this.setJwtToken(this.decodeJwt(jwtToken));
    }
}

export default JwtService;
