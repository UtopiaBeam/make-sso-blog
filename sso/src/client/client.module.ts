import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel, ClientSchema } from './client.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ClientModel, schema: ClientSchema },
        ]),
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}
