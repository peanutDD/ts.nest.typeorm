import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterInput } from './dto/register.input';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersReository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.usersReository.find();
  }

  async register(registerData: RegisterInput): Promise<User> {
    return this.usersReository
      .create({
        ...registerData,
        // password: bcrypt.hashSync(registerData.password),
        // confirmedPassword: bcrypt.hashSync(registerData.confirmedPassword),
      })
      .save();
  }
}
