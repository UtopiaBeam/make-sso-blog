import { Injectable } from '@nestjs/common';
import { RedirectAndToken } from './auth.interface';
import { Client } from '../client/client.interface';
import { Ticket } from '../ticket/ticket.interface';
import { ClientService } from '../client/client.service';
import { TicketService } from '../ticket/ticket.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly clientService: ClientService,
        private readonly jwtService: JwtService,
        private readonly ticketService: TicketService,
    ) {}
    loginPageUrl(appId: string): string {
        return `${process.env.FRONTEND_URL}?appid=${appId}`;
    }

    private redirectUrl(callback: string, ticket: string): string {
        return `${callback}?ticket=${ticket}`;
    }

    getUserId(cookie: string): string {
        return this.jwtService.verify(cookie).userId;
    }

    async getRedirectAndToken(
        appId: string,
        userId: string,
    ): Promise<RedirectAndToken> {
        const { callbackUrl }: Client = await this.clientService.findById(
            appId,
        );
        const { code }: Ticket = await this.ticketService.create(appId, userId);
        const redirectUrl = this.redirectUrl(callbackUrl, code);
        const token = this.jwtService.sign({ userId });
        return { redirectUrl, token };
    }
}
