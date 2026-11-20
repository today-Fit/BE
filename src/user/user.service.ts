import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserSettingsDto } from './dto/upsert-user-settings.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly __prisma:PrismaService
    ) {}

    async updateSettings(id:number, updateUserSettingsDto:UpsertUserSettingsDto) {
        await this.__prisma.userSetting.update({
            data: {
                goingToSchoolTime: updateUserSettingsDto.going_to_school_time,
                constitution: updateUserSettingsDto.consitution
            },
            where: {
                userId: id
            }
        });
    }
}
