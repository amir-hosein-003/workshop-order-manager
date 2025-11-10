import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { CookieService } from './cookie.service';
import { User } from '../users/entities/user.entity';
import { TokenService } from './token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    /**
     * inject Token repository
     */
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cookieService: CookieService,
    private tokenService: TokenService,
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
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const matchPassword = await bcrypt.compare(dto.password, user.password);
    if (!matchPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    this.cookieService.setRefreshToken(res, tokens.refreshToken);

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    const hashedToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.tokenRepository.upsert(
      { userId: user.id, token: hashedToken, expiredAt },
      ['userId'],
    );

    const { password: _, ...safeUser } = user;
    return {
      accessToken: tokens.accessToken,
      user: safeUser,
    };
  }

  async refresh(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_SECRET'),
      });

      const foundToken = await this.tokenService.findOne({
        userId: payload.sub,
        expiredAt: MoreThanOrEqual(new Date()),
      });
      if (
        !foundToken ||
        !(await bcrypt.compare(refreshToken, foundToken.token))
      )
        throw new UnauthorizedException('Refresh token not found');

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException();

      const tokens = await this.generateTokens(user);
      this.cookieService.setRefreshToken(res, tokens.refreshToken);

      // Update the refresh token in the database
      const expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 7);

      const hashedToken = await bcrypt.hash(tokens.refreshToken, 10);

      await this.tokenRepository.upsert(
        { userId: user.id, token: hashedToken, expiredAt },
        ['userId'],
      );

      res.status(200);
      return {
        accessToken: tokens.accessToken,
      };
    } catch (err) {
      console.log('refresh catch block: ', err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(req: Request) {
    try {
      const accessToken = req.headers.authorization?.replace('Bearer ', '');
      if (!accessToken) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(accessToken);

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new NotFoundException();

      const { password, ...data } = user;
      return data;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  async logout(res: Response, req: Request) {
    const refreshToken = req.cookies.refresh_token;

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('REFRESH_SECRET'),
    });

    await this.tokenService.delete({ userId: payload.sub });

    this.cookieService.clearRefreshToken(res);
    return {
      message: 'success',
    };
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
