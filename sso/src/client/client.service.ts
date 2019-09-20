import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientModel } from './client.schema';
import { Model } from 'mongoose';
import { Client, ClientDto } from './client.interface';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcryptjs';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(ClientModel) private readonly model: Model<Client>,
    ) {}

    private hashSecret(secret: string) {
        return hashSync(secret, process.env.SECRET);
    }

    async create({ callbackUrl }: ClientDto) {
        const secret: string = uuid();
        const client = new this.model({
            callbackUrl,
            secret: this.hashSecret(secret),
        });
        await client.save();
        return { callbackUrl, secret };
    }

    updateCallbackUrl(id: string, callbackUrl: string) {
        return this.model.findByIdAndUpdate(id, { callbackUrl }, { new: true });
    }

    async resetSecret(id: string) {
        const secret: string = uuid();
        await this.model.findByIdAndUpdate(id, {
            secret: this.hashSecret(secret),
        });
        return { secret };
    }

    delete(id: string) {
        return this.model.findOneAndDelete(id);
    }
}
