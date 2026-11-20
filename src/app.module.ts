import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// module
import { ConfigModule } from "@nestjs/config";
import { LocationModule } from './location/location.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
import { OutfitsModule } from './outfits/outfits.module';
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
        LocationModule,
        AuthModule,
        WeatherModule,
        UserModule,
        OutfitsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
