import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpsertUserSettingsDto } from './dto/upsert-user-settings.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('/user')
export class UserController {
    constructor(
        private readonly __service:UserService
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @HttpCode(204)
    @Patch("/settings")
    async updateSettings(@GetUser("sub") id:number, @Body() updateUserSettingsDto:UpsertUserSettingsDto) {
        this.__service.updateSettings(id, updateUserSettingsDto);
    }
}
