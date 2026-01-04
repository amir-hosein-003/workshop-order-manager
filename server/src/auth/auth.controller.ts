import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import type { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.register(dto, res);
    return res.json(result);
  }

  @Post('login')
  async login(@Body() dto: SignInDto, @Res() res: Response) {
    const result = await this.authService.login(dto, res);
    return res.json(result);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies.refresh_token;
    return await this.authService.refresh(token, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    return await this.authService.getMe(req);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return await this.authService.logout(res, req);
  }
}
