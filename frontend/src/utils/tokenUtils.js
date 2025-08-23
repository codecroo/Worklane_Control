import * as jwt_decode from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decoded = jwt_decode(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
    } catch {
        return false;
    }
};