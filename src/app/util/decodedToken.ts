import { Itoken } from "../shared/interfaces/token";
import jwt_decode from 'jwt-decode';

export function decodedAccessToken(token: string): Itoken | null{
    try {
        return jwt_decode(token) as Itoken;
    } catch(Error) {
        return null;
    }
}