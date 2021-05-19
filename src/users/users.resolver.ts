import { UsersService } from './users.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async register(@Args('data') registerData: RegisterInput): Promise<User> {
    return await this.usersService.register(registerData);
  }

  @Mutation(() => User)
  async login(@Args('data') loginData: LoginInput): Promise<User> {
    return await this.usersService.login(loginData);
  }
}
