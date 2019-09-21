import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
        }),
        ClientModule,
        UserModule,
    ],
})
export class AppModule {}
