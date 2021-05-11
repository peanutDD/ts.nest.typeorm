import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import { Base } from '../shared/base.entity';
import * as bcrypt from 'bcryptjs';
import { Field, ObjectType } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import config from '../config/configuration';

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

  @Field(() => String)
  get token() {
    const payload = { id: this.id, username: this.username };
    return jwt.sign(payload, config.auth.secretKey, { expiresIn: '7D' });
  }
}
