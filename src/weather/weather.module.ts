import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
