import { Schema } from 'mongoose';

export const ClientSchema = new Schema({
    callbackUrl: String,
    secret: String,
});

export const ClientModel = 'Client';
