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
        return hashSync(secret);
    }

    findById(id: string): Promise<Client> {
        return this.model.findById(id).exec();
    }

    async create({ callbackUrl }: ClientDto): Promise<Client> {
        const secret: string = uuid();
        const client = new this.model({
            callbackUrl,
            secret: this.hashSecret(secret),
        });
        await client.save();
        client.secret = secret;
        return client;
    }

    updateCallbackUrl(id: string, callbackUrl: string): Promise<Client> {
        return this.model
            .findByIdAndUpdate(id, { callbackUrl }, { new: true })
            .exec();
    }

    delete(id: string): Promise<Client> {
        return this.model.findOneAndDelete(id).exec();
    }

    async verify(id: string, secret: string): Promise<boolean> {
        const client = await this.findById(id);
        return client.secret === this.hashSecret(secret);
    }
}
