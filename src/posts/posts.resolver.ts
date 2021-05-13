import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './posts.entity';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from '../comments/dto/create-comment.input';
import { Comment } from '../comments/comment.entity';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Query(() => [Post], { nullable: 'items' })
  async getPosts() {
    return await this.postsService.all();
  }

  @Query(() => Post)
  async getPost(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.postsService.one(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('data') createPostData: CreatePostInput,
    @Context() context: any,
  ): Promise<Post> {
    console.log(context.req);
    const { user } = context.req;
    return await this.postsService.createPost(createPostData, user);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('data') updatePostData: UpdatePostInput,
    @Context() context: any,
  ): Promise<Post> {
    const { user } = context.req;
    return await this.postsService.updatePost(id, updatePostData, user);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @Args({ name: 'postId', type: () => Int }) postId: number,
    @Args('data') createCommentData: CreateCommentInput,
    @Context() context: any,
  ): Promise<Comment> {
    const { user } = context.req;
    return await this.postsService.createComment(
      postId,
      createCommentData,
      user,
    );
  }
}
