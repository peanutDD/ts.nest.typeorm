import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './posts.entity';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  /**
   * get posts
   *
   * @Method all
   *
   */

  async all(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  /**
   * get post
   *
   * @Method one
   *
   */
  async one(id: number): Promise<Post> {
    return this.postsRepository.findOneOrFail(id);
  }

  /**
   * create Post
   *
   * @Method createPost
   *
   */
  async createPost(createPostData: CreatePostInput, user: User): Promise<Post> {
    return this.postsRepository
      .create({
        ...createPostData,
        user,
      })
      .save();
  }

  /**
   * update Post
   *
   * @Method updatePost
   *
   */
  async updatePost(
    id: number,
    updatePostData: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    const post = await this.postsRepository.findOneOrFail({ id, user });
    return this.postsRepository.save({ post, ...updatePostData });
  }

  /**
   * create comment
   *
   * @Method createComment
   *
   */
  async createComment(
    postId: number,
    createCommentData: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const post = await this.postsRepository.findOneOrFail(postId);
    return await this.commentsRepository
      .create({
        ...createCommentData,
        user,
        post,
      })
      .save();
  }
}
