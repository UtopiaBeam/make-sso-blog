import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.schema';
import { Model } from 'mongoose';
import { User, UserDto } from './user.interface';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly model: Model<User>) {}

    private hashPassword(password: string): string {
        return hashSync(password);
    }

    findById(id: string, fields?: string): Promise<User> {
        if (fields) {
            return this.model.findById(id, fields).exec();
        }
        return this.model.findById(id).exec();
    }

    findByName(username: string): Promise<User> {
        return this.model.findOne({ username }).exec();
    }

    create({ username, password }: UserDto): Promise<User> {
        const user = new this.model({
            username,
            password: this.hashPassword(password),
        });
        return user.save();
    }

    async verify(username: string, password: string): Promise<User> {
        const user = await this.findByName(username);
        return user.password === hashSync(password) ? user : null;
    }
}
