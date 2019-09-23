import { Document } from 'mongoose';

export interface UserDto {
    username: string;
    password: string;
}

export interface User extends Document, UserDto {}
