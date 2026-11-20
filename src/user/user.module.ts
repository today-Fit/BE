import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [UserController],
    providers: [
        UserService,
        JwtStrategy
    ]
})
export class UserModule {}
