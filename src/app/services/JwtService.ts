'use client'
import { jwtDecode } from "jwt-decode";
import UserJwtTokenModel from "../models/user/UserJwtTokenModel";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import { redirect } from 'next/navigation'

class JwtService {
    static decodeJwt(jwtToken: string): UserJwtTokenModel {
        return jwtDecode<UserJwtTokenModel>(jwtToken);
    }

    static setJwtToken(ujtm: UserJwtTokenModel, token: string) {
        setCookie('token', token, {expires: new Date(+ujtm.exp * 1000)});
        setCookie('currentUser', UserJwtTokenModel.encodeString(ujtm), {expires: new Date(+ujtm.exp * 1000)});
    }

    static getRawToken(): string | null {
        let token = getCookie("token");
        return token ? token : null;
    }

    static getJwtToken(): UserJwtTokenModel | null {
        if (document === undefined) {
            redirect("/");
        }
        else {
            let token = UserJwtTokenModel.decodeString(getCookie("currentUser"))?.expToDate();
            if (token) {
                return token;
            }
            return null;
        }

    }

    static unsetJwtToken(): void {
        removeCookie('currentUser');
    }

    static handleJwt(jwtToken: string) {
        this.setJwtToken(this.decodeJwt(jwtToken), jwtToken);
    }
}

export default JwtService;
