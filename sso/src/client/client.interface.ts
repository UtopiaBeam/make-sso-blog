import { Document } from 'mongoose';

export interface Client extends Document {
    callbackUrl: string;
    secret: string;
}

export interface ClientDto {
    callbackUrl: string;
}
