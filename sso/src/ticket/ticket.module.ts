import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModel, TicketSchema } from './ticket.schema';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TicketModel, schema: TicketSchema },
        ]),
        ClientModule,
        UserModule,
    ],
    controllers: [TicketController],
    providers: [TicketService],
    exports: [TicketService],
})
export class TicketModule {}
