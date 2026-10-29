import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(readonly __config:ConfigService) {
        const adapter = new PrismaPg(__config.getOrThrow("database.url"));
        super({ adapter });
    }
}
