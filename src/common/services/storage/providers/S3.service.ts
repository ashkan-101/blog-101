import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IStorageService } from '../interfaces/IStorage.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME as string;
  }

  async upload(file: Express.Multer.File, options: { path: string; prefix?: string }): Promise<{ imagePath: string; imageName: string }> {
    if (!file) throw new BadRequestException('Please provide a file');

    const fileExt = extname(file.originalname);
    const fileName = `${options.prefix || ''}${uuidv4()}${fileExt}`;
    const key = `${options.path}/${fileName}`.replace(/\/\//g, '/');

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      return {
        imagePath: options.path,
        imageName: fileName,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file to S3');
    }
  }

  async deleteFile(filePath: string, fileName: string): Promise<void> {
    const key = `${filePath}/${fileName}`.replace(/\/\//g, '/');

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        })
      );
    } catch (error) {
      throw new NotFoundException('File not found in S3');
    }
  }

  // async readFile(filePath: string, fileName: string): Promise<Buffer> {
  //   const key = `${filePath}/${fileName}`.replace(/\/\//g, '/');

  //   try {
  //     const response = await this.s3Client.send(
  //       new GetObjectCommand({
  //         Bucket: this.bucketName,
  //         Key: key,
  //       })
  //     );
      
  //     return Buffer.from(await response.Body.transformToByteArray());
  //   } catch (error) {
  //     throw new NotFoundException('File not found in S3');
  //   }
  // }
}