import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CopilotService } from '../copilot/copilot.service';
import outfitsSchema from './schema/outfits.schema';
import { PrismaService } from '../prisma/prisma.service';
import { LocationService } from '../location/location.service';

@Injectable()
export class OutfitsService {
    constructor(
        private readonly __prisma:PrismaService,
        private readonly __copilot:CopilotService,
        private readonly __location:LocationService
    ) {}

    async getOutfits(
        id:number,
        apparentStart:number,
        apparentEnd:number,
        lat:number,
        lng:number
    ) {
        const user = await this.__prisma.userSetting.findFirst({
            where: {
                userId: id
            }
        });

        if(!user) {
            throw new ConflictException("유저 설정이 존재하지 않습니다.");
        }

        const {
            city,
            country_code
        } = await this.__location.getCurrentAddress(lat, lng);

        try {
            const session = await this.__copilot.createSession(
                `당신은 Today-Fit 웹의 Back-End AI 어시스턴트입니다. 사용자의 요청과 체질, 현재 날씨, 현재 장소에 따라 JSON으로 응답을 내보내세요.

                사용자의 요청은 다음과 같습니다:
                - "체감 온도 시작" (float)
                - "체감 온도 끝" (float)
                
                사용자 옵션 데이터는 다음과 같습니다:
                - "등교 시간" ("morning" | "night")
                - "사용자 체질" ("normal" | "cold" | "hot")

                여기에서 "사용자 체질"은 다음과 같은 의미를 가집니다:
                "사용자가 주어지는 온도에 비해 조금 더 따뜻하게 느끼거나 춥게 느끼는 정도"
                
                여기에서 "사용자 체질" 값은 다음과 같은 의미를 가질 수 있습니다:
                - "normal": "평범한 정도의 체질을 지닙니다."
                - "cold": "평상적인 사람에 비해 조금 더 춥게 느낄 수 있습니다."
                - "hot": "평상적인 사람에 비해 조금 더 따뜻하게 느낄 수 있습니다."`
            );

            const data = await session.sendAndWait(
                `{
                    "체감 온도 시작": ${apparentStart},
                    "체감 온도 끝": ${apparentEnd},
                    "등교 시간": "${user.goingToSchoolTime}",
                    "사용자 체질": "${user.constitution}",
                    "city": "${city}",
                    "country": "${country_code}"
                }`,
                outfitsSchema,
                60000
            );

            await session.disconnect();

            return data;
        }
        catch(e:unknown) {
            console.log(e);
            throw new InternalServerErrorException("서버 내 AI 사용 과정에서 문제가 생겼습니다.");
        }
    }
}
