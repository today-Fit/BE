import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller("location")
export class LocationController {
    constructor(private readonly __locationService:LocationService) {}

    @Get()
    async getLocation(@Query("lat") lat?:string, @Query("lng") lng?:string) {
        const parsedLat = Number(lat);
        const parsedLng = Number(lng);

        if(
            !lat ||
      !lng ||
      Number.isNaN(parsedLat) ||
      Number.isNaN(parsedLng) ||
      parsedLat < -90 ||
      parsedLat > 90 ||
      parsedLng < -180 ||
      parsedLng > 180
        ) {
            throw new BadRequestException("유효한 lat, lng 값이 필요합니다.");
        }

        const data = await this.__locationService.getCurrentAddress(
            parsedLat,
            parsedLng
        );

        return {
            success: true,
            data
        };
    }
}
