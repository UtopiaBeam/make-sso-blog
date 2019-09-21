import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TicketModel } from './ticket.schema';
import { Model } from 'mongoose';
import { Ticket } from './ticket.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TicketService {
    constructor(
        @InjectModel(TicketModel) private readonly model: Model<Ticket>,
    ) {}

    create(clientId: string, userId: string): Promise<Ticket> {
        const code = uuid();
        const ticket = new this.model({ clientId, userId, code });
        return ticket.save();
    }

    async validate(clientId: string, code: string) {
        const ticket = await this.model.findOne({ clientId, code }).exec();
        if (ticket) {
            await this.delete(ticket._id);
            return ticket.userId;
        }
    }

    private delete(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
