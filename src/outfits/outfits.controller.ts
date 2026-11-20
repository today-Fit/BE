import { Controller, Get, ParseFloatPipe, Query, UseGuards } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('outfits')
export class OutfitsController {
    constructor(
        private readonly __service:OutfitsService
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getOutfits(
        @GetUser("sub") id:number,
        @Query("apparentStart", ParseFloatPipe) apparentStart:number,
        @Query("apparentEnd", ParseFloatPipe) apparentEnd:number,
        @Query("lat", ParseFloatPipe) lat:number,
        @Query("lng", ParseFloatPipe) lng:number
    ) {
        return this.__service.getOutfits(
            id,
            apparentStart,
            apparentEnd,
            lat,
            lng
        );
    }
}
