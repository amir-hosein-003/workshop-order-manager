import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(sigUpDto: SignUpDto) {
    return this.usersService.create(sigUpDto);
  }

  async login(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const foundUser = await this.usersRepository.findOne({ where: { email } });
    if (!foundUser) throw new NotFoundException('User not found');

    const matchedPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchedPassword)
      throw new UnauthorizedException('Wrong credentials(Password not found)');

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload);

    const { password: _, ...userData } = foundUser;
    return { ...userData, token };
  }
}
