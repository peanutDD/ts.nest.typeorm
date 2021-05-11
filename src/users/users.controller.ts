import { Controller, Get } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/api')
  async all(): Promise<User[]> {
    return this.usersService.all();
  }
}
