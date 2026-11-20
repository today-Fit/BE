import { JwtPayloadRefresh } from "../types/jwt-payload.type";

export function isRefreshToken(refreshToken:unknown):refreshToken is JwtPayloadRefresh {
    if(typeof refreshToken !== "object" || refreshToken === null) {
        return false;
    }

    if(!("sub" in refreshToken) || !("tokenType" in refreshToken)) {
        return false;
    }

    return (
        typeof refreshToken.sub === "number"
        && refreshToken.tokenType === "refresh"
    );
}
