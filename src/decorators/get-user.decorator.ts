import { createParamDecorator } from "@nestjs/common";
import { JwtPayloadAccess } from "../auth/types/jwt-payload.type";

export const GetUser = createParamDecorator((key:keyof JwtPayloadAccess | undefined, context) => {
    const req = context.switchToHttp().getRequest();
    const userPayload:JwtPayloadAccess = req.user;

    return key ? userPayload[key] : userPayload;
});
