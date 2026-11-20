import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
    imports: [
        HttpModule.registerAsync({
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
                    key: configService.get<string>("VWORLD_API_KEY")
                }
            })
        })
    ],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [LocationService]
})
export class LocationModule {}
