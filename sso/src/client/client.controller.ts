import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientDto } from './client.interface';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly service: ClientService) {}

    @Post()
    create(@Body() clientDto: ClientDto) {
        return this.service.create(clientDto);
    }

    @Patch(':id')
    updateCallbackUrl(@Param('id') id: string, @Body('callbackUrl') url: string) {
        return this.service.updateCallbackUrl(id, url);
    }

    @Patch(':id/reset')
    resetSecret(@Param('id') id: string) {
        return this.service.resetSecret(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
