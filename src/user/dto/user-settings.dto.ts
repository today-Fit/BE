import { GoingToSchoolTime, UserConstitution } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UserSettingsDto {
    @IsEnum(GoingToSchoolTime)
    readonly going_to_school_time:GoingToSchoolTime;

    @IsEnum(UserConstitution)
    readonly consitution:UserConstitution;
}
