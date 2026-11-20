import { GoingToSchoolTime, UserConstitution } from "@prisma/client";
import { IsEnum } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

class UserSettingsDto {
    @IsEnum(GoingToSchoolTime)
    readonly going_to_school_time:GoingToSchoolTime;

    @IsEnum(UserConstitution)
    readonly consitution:UserConstitution;
}

export class UpsertUserSettingsDto extends PartialType(UserSettingsDto) {}
