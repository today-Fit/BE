import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// module
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';
// config
import databaseConfig from './configs/database.config';
import jwtConfig from './configs/jwt.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                databaseConfig,
                jwtConfig
            ]
        }),
        PrismaModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
