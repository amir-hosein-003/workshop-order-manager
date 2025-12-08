import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieService } from './cookie.service';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'jwt_secret';
      if (key === 'REFRESH_SECRET') return 'refresh_secret';
    }),
  };

  const mockCookieService = {
    setRefreshToken: jest.fn(),
  };

  const mockTokenRepository = {
    upsert: jest.fn(),
  };

  const mockTokenService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: getRepositoryToken(Token), useValue: mockTokenRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login successfully', async () => {
    const dto = { email: 'test@mail.com', password: '123456' };
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Mock کردن خروجی findByEmail
    mockUsersService.findByEmail.mockResolvedValue({
      id: '1',
      name: 'Test',
      email: dto.email,
      password: hashedPassword,
      role: 'user',
    });

    // Mock کردن signAsync
    mockJwtService.signAsync.mockResolvedValueOnce('access_token');
    mockJwtService.signAsync.mockResolvedValueOnce('refresh_token');

    // Mock upsert
    mockTokenRepository.upsert.mockResolvedValue({});

    // Mock response
    const mockRes: any = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const result = await service.login(dto, mockRes);

    expect(mockUsersService.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
    expect(mockCookieService.setRefreshToken).toHaveBeenCalledWith(
      mockRes,
      'refresh_token',
    );
    expect(mockTokenRepository.upsert).toHaveBeenCalled();
    expect(result).toHaveProperty('accessToken', 'access_token');
    expect(result.user.email).toBe(dto.email);
  });

  it('should throw error if email not found', async () => {
    const dto = { email: 'wrong@mail.com', password: '123456' };
    mockUsersService.findByEmail.mockResolvedValue(null);

    const mockRes: any = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await expect(service.login(dto, mockRes)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
