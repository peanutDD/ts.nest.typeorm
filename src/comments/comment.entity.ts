import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Entity('comments')
@ObjectType()
export class Comment extends Base {
  @Column('text')
  @Field()
  body: string;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @Field(() => Post)
  post: Post;
}
