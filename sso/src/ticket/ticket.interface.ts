import { Document } from 'mongoose';

export interface Ticket extends Document {
    code: string;
    clientId: string;
    userId: string;
}
