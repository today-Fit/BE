import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.open-meteo.com/v1',
      timeout: 5000,
    }),
    LocationModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}