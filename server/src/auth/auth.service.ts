import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  
  async register(sigUpDto: SignUpDto) {}
  
  async login(signInDto: SignInDto) {}
}
