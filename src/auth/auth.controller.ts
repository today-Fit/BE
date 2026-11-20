import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenContainer } from './dto/refresh-token-container.dto';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly __service:AuthService
    ) {}

    // 분리할 정도로 크지 않아 혼용하였습니다.
    @Post("/register")
    async register(@Body() loginUserDto:LoginUserDto) {
        const {
            name,
            password
        } = loginUserDto;

        return this.__service.register(name, password);
    }

    @Post("/login")
    async login(@Body() loginUserDto:LoginUserDto) {
        const {
            name,
            password
        } = loginUserDto;

        return this.__service.login(name, password);
    }

    @Post("/refresh")
    async refresh(@Body() container:RefreshTokenContainer) {
        const {
            refresh_token: refreshToken
        } = container;

        return this.__service.refresh(refreshToken);
    }
}
