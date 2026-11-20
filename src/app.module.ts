import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// module
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
// config
import commonConfig from './configs/common.config';
import jwtConfig from './configs/jwt.config';
// schema
import schemaEnv from './schema/env';
// utils
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                commonConfig,
                jwtConfig
            ],
            envFilePath: join(__dirname, `../.env.${process.env["NODE_ENV"]!}`),
            validationSchema: schemaEnv
        }),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
