import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    password: string;
}

export interface UserDto {
    username: string;
    password: string;
}
