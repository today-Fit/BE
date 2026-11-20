import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentAddress(lat: number, lng: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get("", {
          params: {
            point: `${lng},${lat}`, // Vworld는 경도(lng), 위도(lat) 순서입니다
          },
        }),
      );

      const city = data?.response?.result?.[0]?.structure?.level1;

      if (data?.response?.status !== "OK" || !city) {
        throw new InternalServerErrorException(
          "Vworld에서 주소를 찾지 못했습니다.",
        );
      }

      return {
        city,
        country_code: "KR",
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      throw new InternalServerErrorException(
        "Vworld API 호출 중 오류가 발생했습니다.",
      );
    }
  }
}
