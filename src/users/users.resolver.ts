import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.entity';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => String)
  hello() {
    return 'hello world!';
  }

  @Mutation(() => User)
  register(@Args('input') registerData: RegisterInput): Promise<User> {
    return this.usersService.register(registerData);
  }
}
