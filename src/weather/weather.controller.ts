import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
    @Query('hours') hours?: string,
  ) {
    const parsedLat = Number(lat);
    const parsedLng = Number(lng);

    if (
      !lat ||
      !lng ||
      lat.trim() === '' ||
      lng.trim() === '' ||
      Number.isNaN(parsedLat) ||
      Number.isNaN(parsedLng) ||
      parsedLat < -90 ||
      parsedLat > 90 ||
      parsedLng < -180 ||
      parsedLng > 180
    ) {
      throw new BadRequestException('유효한 lat, lng 값이 필요합니다.');
    }

    // hours 미입력 시 기본값 5시간 적용
    let parsedHours = 5;
    if (hours !== undefined && hours.trim() !== '') {
      parsedHours = Number(hours);
      if (!Number.isInteger(parsedHours) || parsedHours < 1 || parsedHours > 24) {
        throw new BadRequestException('hours는 1 이상 24 이하의 정수여야 합니다.');
      }
    }

    const data = await this.weatherService.getHourlyForecast(
      parsedLat,
      parsedLng,
      parsedHours,
    );
    
    return {
      success: true,
      status: 200,
      message: 'SUCCESS',
      data,
    };
  }
}