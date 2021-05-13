import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async register(registerData: RegisterInput): Promise<User> {
    return this.usersRepository
      .create({
        ...registerData,
        // password: bcrypt.hashSync(registerData.password),
        // confirmedPassword: bcrypt.hashSync(registerData.confirmedPassword),
      })
      .save();
  }

  async login(loginData: LoginInput): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      username: loginData.username,
    });
  }
}
