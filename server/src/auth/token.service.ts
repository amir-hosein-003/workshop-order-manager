import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { FindOperator, Repository } from 'typeorm';

type TokenCondition = {
  [key: string]: string | Date | FindOperator<Date>;
};

@Injectable()
export class TokenService {
  constructor(
    /**
     * inject Token repository
     */
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(body: Partial<Token>) {
    const newToken = this.tokenRepository.create(body);
    return await this.tokenRepository.save(newToken);
  }

  async findOne(condition: TokenCondition) {
    return await this.tokenRepository.findOne({ where: condition });
  }

  async update(condition: TokenCondition, data: Partial<Token>) {
    const foundToken = await this.findOne(condition);
    if (!foundToken) throw new NotFoundException('Token not found');

    Object.assign(foundToken, data);
    return await this.tokenRepository.save(foundToken);
  }

  async delete(condition: TokenCondition) {
    return await this.tokenRepository.delete(condition);
  }
}
