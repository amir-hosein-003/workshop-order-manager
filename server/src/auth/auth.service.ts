import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CookieService } from './cookie.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cookieService: CookieService,
  ) {}

  async register(dto: SignUpDto, res: Response) {
    const user = await this.usersService.create(dto);
    const tokens = await this.generateTokens(user);
    this.cookieService.setRefreshToken(res, tokens.refreshToken);

    const { password: _, ...safeUser } = user;
    return {
      accessToken: tokens.accessToken,
      user: safeUser,
    };
  }

  async login(dto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    this.cookieService.setRefreshToken(res, tokens.refreshToken);

    const { password: _, ...safeUser } = user;
    return {
      accessToken: tokens.accessToken,
      user: safeUser,
    };
  }

  async refresh(refreshToken: string, res: Response) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException();

      const tokens = await this.generateTokens(user);
      this.cookieService.setRefreshToken(res, tokens.refreshToken);

      return { accessToken: tokens.accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(res: Response) {
    this.cookieService.clearRefreshToken(res);
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
