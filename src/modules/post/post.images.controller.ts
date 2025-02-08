import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res, Delete, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from "express";
import { join } from "path";
import { LocalDiskStorageService } from "src/common/services/storage/localDiskStorage.service";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";

@Controller('/api/v1/posts/images')
export class PostImagesController{
  constructor(
    private readonly diskStorageService: LocalDiskStorageService
  ){}

  @UseGuards(JwtAdminGuard)
  @UseInterceptors(FileInterceptor('postImage'))
  @Post('/admin')
  async uploadImage(@UploadedFile() image: Express.Multer.File){
    const imageName = await this.diskStorageService.upload(image, { path: 'post-images', prefix: 'post-image-'})
    return imageName
  }

  @Get('/:imageName')
  async getImage (@Param('imageName') imageName: string, @Res() res: Response){
    return res.sendFile(join(process.cwd(), 'uploads', 'post-images', imageName))
  }

  @UseGuards(JwtAdminGuard)
  @Delete('/admin/:imageName')
  async deleteImage(@Param('imageName') imageName: string){
    await this.diskStorageService.deleteFile(join('post-images', imageName))
    return { deleteResult: true }
  }
}