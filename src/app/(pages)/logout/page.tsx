'use client'
import JwtService from "../../services/JwtService";

export default function Logout() {
    JwtService.unsetJwtToken();
    document.location.href = '/';
    return (<h1>Logout Success</h1>);
}