import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadAccess } from "../auth/types/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow("jwt.access.secret")
        });
    }

    override async validate(payload:JwtPayloadAccess):Promise<JwtPayloadAccess> {
        return payload;
    }
}
