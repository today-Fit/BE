import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import locationConfig from "../configs/location.config";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [
                ConfigModule.forFeature(locationConfig)
            ],
            inject: [ConfigService],
            useFactory: (configService:ConfigService) => ({
                baseURL: "https://api.vworld.kr/req/address",
                timeout: 5000,
                params: {
                    service: "address",
                    request: "getAddress",
                    version: "2.0",
                    crs: "epsg:4326",
                    format: "json",
                    type: "both",
                    key: configService.getOrThrow("location.apiKey")
                }
            })
        })
    ],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [LocationService]
})
export class LocationModule {}
