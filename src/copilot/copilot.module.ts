import { Module } from '@nestjs/common';
import { CopilotService } from './copilot.service';
import { CopilotClient } from "@github/copilot-sdk";
import { ConfigModule, ConfigService } from '@nestjs/config';
import githubConfig from '../configs/github.config';

@Module({
    imports: [
        ConfigModule.forFeature(githubConfig)
    ],
    providers: [
        CopilotService,
        {
            provide: "CopilotClient",
            inject: [ConfigService],
            useFactory(configService:ConfigService) {
                return new CopilotClient({
                    gitHubToken: configService.getOrThrow("github.token")
                });
            }
        }
    ],
    exports: [
        CopilotService
    ]
})
export class CopilotModule {}
