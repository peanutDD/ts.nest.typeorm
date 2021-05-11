import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import { Base } from '../shared/base.entity';
import * as bcrypt from 'bcryptjs';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User extends Base {
  @Column()
  @Field()
  @Index({ unique: true })
  email: string;

  @Column()
  @Field()
  @Index({ unique: true })
  username: string;

  @Column('text')
  @Field()
  password: string;

  @Column('text')
  @Field()
  confirmedPassword: string;

  @BeforeInsert()
  hashSyncPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
    this.confirmedPassword = bcrypt.hashSync(this.confirmedPassword, 10);
  }
}
