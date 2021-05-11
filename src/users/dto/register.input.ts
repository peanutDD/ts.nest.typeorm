import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { IsEqual } from '../validators/IsEqual';
import { IsUserAlreadyExist } from '../validators/IsUserAlreadyExist';
import { IsEmailAlreadyExist } from '../validators/IsEmailAlreadyExist';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsEmailAlreadyExist()
  email: string;

  @Field()
  @MinLength(4)
  @IsNotEmpty()
  @IsUserAlreadyExist()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEqual('password', { message: 'Password must match!' })
  confirmedPassword: string;
}
