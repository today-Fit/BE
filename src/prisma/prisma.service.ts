import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import databaseConfig from '../configs/database.config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(
        @Inject(databaseConfig.KEY)
        config:ConfigType<typeof databaseConfig>
    ) {
        const adapter = new PrismaPg(config.url);
        super({ adapter });
    }
}
