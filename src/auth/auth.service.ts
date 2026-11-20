import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadAccess, JwtPayloadRefresh } from './types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { JwtContainer } from './types/jwt-container.type';
import { isRefreshToken } from './utils/is-refresh-token.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly __prisma:PrismaService,
        private readonly __jwt:JwtService,
        private readonly __config:ConfigService
    ) {}

    async register(name:string, password:string):Promise<JwtContainer> {
        const user = await this.__prisma.user.findFirst({
            where: {
                name
            }
        });

        if(user) {
            throw new ConflictException("해당 이름은 이미 존재합니다.");
        }

        // 생성할 객체는 하나이기 때문에 transaction을 사용하지 않았습니다.
        const newUser = await this.__prisma.user.create({
            data: {
                name,
                password: await argon2.hash(password)
            }
        });

        const [
            accessToken,
            refreshToken
        ] = await Promise.all([
            this.__signAccessToken({
                sub: newUser.id,
                tokenType: "access"
            }),
            this.__signRefreshToken({
                sub: newUser.id,
                tokenType: "refresh"
            })
        ]);

        return {
            "access_token": accessToken,
            "refresh_token": refreshToken
        };
    }

    async login(name:string, password:string) {
        const user = await this.__prisma.user.findFirst({
            where: {
                name
            }
        });

        if(!user) {
            throw new UnauthorizedException("이름 또는 비밀번호가 일치하지 않습니다.");
        }

        const verifyResult = await argon2.verify(user.password, password);

        if(!verifyResult) {
            throw new UnauthorizedException("이름 또는 비밀번호가 일치하지 않습니다.");
        }

        const [
            accessToken,
            refreshToken
        ] = await Promise.all([
            this.__signAccessToken({
                sub: user.id,
                tokenType: "access"
            }),
            this.__signRefreshToken({
                sub: user.id,
                tokenType: "refresh"
            })
        ]);

        return {
            "access_token": accessToken,
            "refresh_token": refreshToken
        };
    }

    async refresh(refreshToken:string) {
        const verifyResult:unknown = await this.__jwt.verifyAsync(refreshToken, {
            secret: this.__config.getOrThrow("jwt.refresh.secret"),
            algorithms: ["HS256"]
        });

        if(!isRefreshToken(verifyResult)) {
            throw new UnauthorizedException("잘못된 리프레시 토큰이 왔습니다.");
        }

        const user = await this.__prisma.user.findFirst({
            where: {
                id: verifyResult.sub
            }
        });

        if(!user) {
            throw new UnauthorizedException("잘못된 리프레시 토큰이 왔습니다.");
        }

        return {
            "access_token": await this.__signAccessToken({
                sub: user.id,
                tokenType: "access"
            })
        };
    }

    private async __signAccessToken(payload:JwtPayloadAccess) {
        return this.__jwt.signAsync(payload, {
            secret: this.__config.getOrThrow("jwt.access.secret"),
            expiresIn: this.__config.getOrThrow("jwt.access.expiresIn"),
            algorithm: "HS256"
        });
    }

    private async __signRefreshToken(payload:JwtPayloadRefresh) {
        return this.__jwt.signAsync(payload, {
            secret: this.__config.getOrThrow("jwt.refresh.secret"),
            expiresIn: this.__config.getOrThrow("jwt.refresh.expiresIn"),
            algorithm: "HS256"
        });
    }
}
