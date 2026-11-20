import { approveAll, CopilotClient } from '@github/copilot-sdk';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class CopilotService implements OnModuleDestroy {
    constructor(
        @Inject("CopilotClient")
        private readonly __copilot:CopilotClient
    ) {
        (async () => {
            await this.__copilot.start();
        })();
    }

    async createSession(systemMessageContent:string) {
        return this.__copilot.createSession({
            onPermissionRequest: approveAll,
            systemMessage: {
                mode: "replace",
                content: systemMessageContent
            }
        });
    }

    async onModuleDestroy() {
        await this.__copilot.forceStop();
    }
}
