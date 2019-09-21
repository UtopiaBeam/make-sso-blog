import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModel, TicketSchema } from './ticket.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TicketModel, schema: TicketSchema },
        ]),
    ],
    controllers: [TicketController],
    providers: [TicketService],
    exports: [TicketService],
})
export class TicketModule {}
