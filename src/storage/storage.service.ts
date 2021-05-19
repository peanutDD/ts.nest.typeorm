/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { checksumFile } from '../../utils/checksumFile';
import config from '../config/configuration';
import OSS from 'ali-oss';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class StorageService {
  async fileUpload({
    filename,
    createReadStream,
  }: FileUpload): Promise<string> {
    const ext = filename.match(/\.[a-z]+$/);

    const md5Filename = await checksumFile('md5', createReadStream);
    console.log(md5Filename);

    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./client/upload/${md5Filename}${ext}`))
        .on('finish', () => resolve(`upload/${md5Filename}${ext}`))
        .on('error', () => reject(`false`));
    });
  }

  async aliyunFileUpload({
    filename,
    createReadStream,
  }: FileUpload): Promise<string> {
    const ext = filename.match(/\.[a-z]+$/);

    const md5Filename = await checksumFile('md5', createReadStream);

    const client = new OSS({
      region: config.aliyun.oss.region,
      accessKeyId: config.aliyun.oss.accessKeyId!,
      accessKeySecret: config.aliyun.oss.accessKeySecret!,
      bucket: config.aliyun.oss.bucket,
    });

    const result: any = await client.put(
      `upload_images/${md5Filename}${ext}`,
      createReadStream(),
    );
    return result.url;
  }
}
