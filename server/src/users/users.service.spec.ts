import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repoMock: any;

  beforeEach(async () => {
    repoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test successfully create
  it('should create user successfully', async () => {
    const dto: CreateUserDto = {
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    };

    repoMock.findOne.mockResolvedValue(null);
    repoMock.create.mockReturnValue(dto);
    repoMock.save.mockResolvedValue({
      id: '1',
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      role: 'operator',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(dto);

    expect(result.id).toBeDefined();
    expect(result.email).toBe(dto.email);
    expect(repoMock.save).toHaveBeenCalled();
  });

  // test duplicate email case
  it('should throw error when email exists', async () => {
    const dto: CreateUserDto = {
      name: 'test',
      email: 'test@mail.com',
      password: '123456',
    };

    repoMock.findOne.mockResolvedValue({ id: '1', email: dto.email });

    await expect(service.create(dto)).rejects.toThrow(
      'User with this email in use',
    );
  });

  // test findById()
  it('should return user by id', async () => {
    const user = {
      id: '1',
      name: 'test',
      email: 'example@gmail.com',
      password: '123456',
    };

    repoMock.findOne.mockResolvedValue(user);

    const result = await service.findById('1');

    expect(repoMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(user);
  });

  it('should return null if user not found', async () => {
    repoMock.findOne.mockResolvedValue(null);

    const result = await service.findById('123');

    expect(result).toBeNull();
  });

  // test findByEmail()
  it('should return user by email', async () => {
    const user = {
      id: '1',
      name: 'test',
      email: 'example@gmail.com',
      password: '123456',
    };

    repoMock.findOne.mockResolvedValue(user);

    const result = await service.findByEmail('example@gmail.com');

    expect(repoMock.findOne).toHaveBeenCalledWith({
      where: { email: 'example@gmail.com' },
    });
    expect(result).toEqual(user);
  });

  it('should return null if email not found', async () => {
    repoMock.findOne.mockResolvedValue(null);

    const result = await service.findByEmail('notfound@mail.com');

    expect(result).toBeNull();
  });
});
