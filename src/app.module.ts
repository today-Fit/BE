import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// module
import { ConfigModule } from "@nestjs/config";
// config
import { join } from 'path';
import schemaEnv from './schema/env';
import commonConfig from './configs/common.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                commonConfig
            ],
            envFilePath: join(__dirname, `../.env.${process.env["NODE_ENV"]!}`),
            validationSchema: schemaEnv
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
