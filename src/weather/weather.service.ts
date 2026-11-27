import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../location/location.service';

interface OpenMeteoResponse {
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly locationService: LocationService,
  ) {}

  async getHourlyForecast(lat: number, lng: number, hours: number) {
    try {
      const [locationInfo, weatherResponse] = await Promise.all([
        this.locationService.getCurrentAddress(lat, lng),
        firstValueFrom(
          this.httpService.get<OpenMeteoResponse>('/forecast', {
            params: {
              latitude: lat,
              longitude: lng,
              hourly: 'temperature_2m,weather_code',
              timezone: 'Asia/Seoul',
              forecast_days: 2,
            },
          }),
        ),
      ]);

      const hourly = weatherResponse.data?.hourly;
      if (!hourly?.time?.length) {
        throw new InternalServerErrorException('날씨 예보 데이터를 가져오지 못했습니다.');
      }

      // 한국 시간(KST) 기준 현재 시각 ("YYYY-MM-DDTHH") 찾기
      const nowKst = new Date(Date.now() + 9 * 60 * 60 * 1000);
      const currentHourPrefix = nowKst.toISOString().slice(0, 13);

      const foundIndex = hourly.time.findIndex((t) => t.startsWith(currentHourPrefix));
      const startIndex = foundIndex >= 0 ? foundIndex : 0;

      const hourlyForecast = hourly.time
        .slice(startIndex, startIndex + hours)
        .map((isoTime, idx) => {
          const targetIdx = startIndex + idx;
          const hour = isoTime.slice(11, 13); // "09", "10" 추출
          const weatherCode = hourly.weather_code[targetIdx];
          const { weatherText, icon } = this.mapWeatherCode(weatherCode);

          return {
            time: `${hour}시`,
            temp: Math.round(hourly.temperature_2m[targetIdx]),
            weatherCode,
            weatherText,
            icon,
          };
        });

      return {
        location: locationInfo.city,
        updatedAt: hourly.time[startIndex] ?? `${currentHourPrefix}:00`,
        hourlyForecast,
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('날씨 API 연동 중 서버 오류가 발생했습니다.');
    }
  }

  private mapWeatherCode(code: number): { weatherText: string; icon: string } {
    if (code === 0) return { weatherText: '맑음', icon: 'sunny' };
    if (code === 1) return { weatherText: '구름 조금', icon: 'partly_cloudy' };
    if (code === 2) return { weatherText: '구름 많음', icon: 'cloudy' };
    if (code === 3) return { weatherText: '흐림', icon: 'overcast' };
    if (code === 45 || code === 48) return { weatherText: '안개', icon: 'fog' };
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      return { weatherText: '비', icon: 'rain' };
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return { weatherText: '눈', icon: 'snow' };
    }
    if ([95, 96, 99].includes(code)) {
      return { weatherText: '뇌우', icon: 'thunderstorm' };
    }
    return { weatherText: '흐림', icon: 'cloudy' };
  }
}