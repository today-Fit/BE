import { Module } from '@nestjs/common';
import { OutfitsController } from './outfits.controller';
import { OutfitsService } from './outfits.service';
import { CopilotModule } from '../copilot/copilot.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationModule } from '../location/location.module';

@Module({
    imports: [
        CopilotModule,
        PrismaModule,
        LocationModule
    ],
    controllers: [OutfitsController],
    providers: [OutfitsService]
})
export class OutfitsModule {}
