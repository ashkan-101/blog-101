import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { config } from 'dotenv';
import { IStorageService } from '../interfaces/IStorage.service';
config()

@Injectable()
export class LocalDiskStorageService implements IStorageService{
  private readonly uploadDir = join(process.cwd(), 'uploads');

  async upload(file: Express.Multer.File, options: { path: string; prefix?: string }): Promise<{ imagePath: string, imageName: string }> {
    if(!file) throw new BadRequestException('please entered a file')

    const fileExt = extname(file.originalname); 
    const fileName = `${options.prefix || ''}${uuidv4()}${fileExt}`;

    const fullPath = join(this.uploadDir, options.path, fileName);

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
}