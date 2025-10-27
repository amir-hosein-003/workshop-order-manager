import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    /**
     * injecting userRepository
     */
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new UnauthorizedException('User with this email in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    newUser = await this.usersRepository.save(newUser);

    const { password: _, ...userData } = newUser;

    return userData;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
