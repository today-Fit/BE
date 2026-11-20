import { IsString } from "class-validator";

export class RefreshTokenContainer {
    @IsString()
    readonly refresh_token:string;
}
