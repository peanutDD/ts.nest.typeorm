import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => String)
  hello() {
    return 'hello world!';
  }

  @Mutation(() => User)
  register(@Args('data') registerData: RegisterInput): Promise<User> {
    return this.usersService.register(registerData);
  }

  @Mutation(() => User)
  async login(@Args('data') loginData: LoginInput): Promise<User> {
    return await this.usersService.login(loginData);
  }
}
