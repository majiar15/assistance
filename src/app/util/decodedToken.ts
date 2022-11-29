import { Itoken } from "../interfaces/token";
import jwt_decode from 'jwt-decode';

export function decodedAccessToken(token: string): Itoken | null{
    try {
        console.log(jwt_decode(token));
        return jwt_decode(token) as Itoken;
    } catch(Error) {
        return null;
    }
}