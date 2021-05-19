import { StorageService } from './storage.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';

@Resolver()
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}
  @Mutation(() => String)
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    console.log(file.filename);
    const data = await this.storageService.fileUpload(file);
    console.log(data);
    return data;
  }

  @Mutation(() => String)
  async aliyunFileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    return await this.storageService.aliyunFileUpload(file);
  }
}
