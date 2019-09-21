import {
    Controller,
    Get,
    Headers,
    UnauthorizedException,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ClientService } from '../client/client.service';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';

@Controller('ticket')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
    ) {}

    @Get('/validate')
    async validate(@Headers() { appId, appSecret, ticket }) {
        if (!(await this.clientService.verify(appId, appSecret))) {
            throw new UnauthorizedException('Invalid app id and/or secret');
        }
        const userId = await this.ticketService.validate(appId, ticket);
        const user: User = await this.userService.findById(
            userId,
            '_id username',
        );
        if (user) {
            return user;
        }
        throw new UnauthorizedException('Invalid ticket');
    }
}
