import {
    Controller,
    Post,
    Param,
    Body,
    Get,
    Res,
    UnauthorizedException,
    Headers,
    Req,
} from '@nestjs/common';
import { UserDto, User } from '../user/user.interface';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response, Request } from 'express';
import { RedirectAndToken } from './auth.interface';

@Controller('auth')
export class AuthController {
    private readonly MONTH_IN_MSEC = 30 * 24 * 3600 * 1000;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get()
    loginPage(@Res() res: Response, @Headers('appid') appId: string) {
        return res.redirect(this.authService.loginPageUrl(appId));
    }

    @Post('login')
    async login(
        @Headers('appid') appId: string,
        @Body() { username, password }: UserDto,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const user: User = req.cookies
            ? await this.userService.findById(
                  this.authService.getUserId(req.cookies),
              )
            : await this.userService.verify(username, password);
        if (!user) {
            throw new UnauthorizedException('Wrong username and/or password');
        }
        const {
            redirectUrl,
            token,
        }: RedirectAndToken = await this.authService.getRedirectAndToken(
            appId,
            user._id,
        );
        return res
            .cookie('token', token, { maxAge: this.MONTH_IN_MSEC })
            .redirect(redirectUrl);
    }

    @Post('register')
    async register(
        @Headers('appid') appId: string,
        @Body() userDto: UserDto,
        @Res() res: Response,
    ) {
        const user: User = await this.userService.create(userDto);
        const {
            redirectUrl,
            token,
        }: RedirectAndToken = await this.authService.getRedirectAndToken(
            appId,
            user._id,
        );
        return res
            .cookie('token', token, { maxAge: this.MONTH_IN_MSEC })
            .redirect(redirectUrl);
    }
}
