import { IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @IsString()
    readonly name:string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 1
    })
    readonly password:string;
}
