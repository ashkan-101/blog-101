import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { config } from 'dotenv';
import { StorageService } from 'src/common/abstracts/storage.service';
config()

@Injectable()
export class LocalDiskStorageService extends StorageService{
  private readonly uploadDir = join(process.cwd(), 'uploads');

  async upload(file: Express.Multer.File, options: { path: string; prefix?: string }): Promise<{ imagePath: string, imageName: string }> {
    if(!file) throw new BadRequestException('please entered a file')

    const fileExt = extname(file.originalname); 
    const fileName = `${options.prefix || ''}${uuidv4()}${fileExt}`;

    const fullPath = join(this.uploadDir, options.path, fileName);

    // const publicPath = join(options.path, fileName).replace(/\\/g, '/');

    await fs.promises.mkdir(join(this.uploadDir, options.path), { recursive: true });
    await fs.promises.writeFile(fullPath, file.buffer);

    return {
      imagePath: options.path,
      imageName: fileName
    };
  }

  async deleteFile(filePath: string, fileName: string): Promise<void> {
    const fullPath = join(this.uploadDir, filePath, fileName);
    try {
      await fs.promises.unlink(fullPath); 
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async readFile(filePath: string, fileName: string){
    const fullPath = join(this.uploadDir, filePath, fileName);
    try { 
      return await fs.promises.readFile(fullPath)
    } catch (error) {
      throw new NotFoundException('file not Found')
    }
  }


  // public getFileUrl(path: string): string {
  //   return `${process.env.APP_URL}:${process.env.APP_PORT}/uploads/${path}`;
  // }

  // async moveFile(sourcePath: string, destinationPath: string): Promise<void> {
  //   try {
  //     await fs.promises.rename(sourcePath, destinationPath);
  //   } catch (error) {
  //     throw new Error(`Failed to move file from ${sourcePath} to ${destinationPath}`);
  //   }
  // }
}