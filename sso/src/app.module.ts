import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
        }),
        ClientModule,
        UserModule,
        TicketModule,
    ],
})
export class AppModule {}
