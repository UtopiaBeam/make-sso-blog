import { Schema } from 'mongoose';
import { ClientModel } from '../client/client.schema';
import { UserModel } from '../user/user.schema';

export const TicketSchema = new Schema({
    code: String,
    clientId: {
        type: Schema.Types.ObjectId,
        ref: ClientModel,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
    },
});

export const TicketModel = 'Ticket';
