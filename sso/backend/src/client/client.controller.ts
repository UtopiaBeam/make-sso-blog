import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientDto, Client } from './client.interface';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly service: ClientService) {}

    @Post()
    create(@Body() clientDto: ClientDto): Promise<Client> {
        return this.service.create(clientDto);
    }

    @Patch(':id')
    updateCallbackUrl(
        @Param('id') id: string,
        @Body('callbackUrl') url: string,
    ): Promise<Client> {
        return this.service.updateCallbackUrl(id, url);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Client> {
        return this.service.delete(id);
    }
}
