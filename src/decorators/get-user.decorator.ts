import { createParamDecorator } from "@nestjs/common";
import { Jwt } from "../types/jwt.type";

export const GetUser = createParamDecorator((key:keyof Jwt | undefined, context) => {
    const req = context.switchToHttp().getRequest();
    const userPayload:Jwt = req.user;

    return key ? userPayload[key] : userPayload;
});
