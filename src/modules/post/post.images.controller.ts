import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res, Delete, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Express, Response } from "express";
import { join } from "path";
import { LocalDiskStorageService } from "src/common/services/storage/localDiskStorage.service";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";

@Controller('/api/v1/posts/images')
export class PostImagesController{
  constructor(
    private readonly diskStorageService: LocalDiskStorageService
  ){}


  @ApiOperation({ summary: 'Upload an image for a post by admin' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The image to upload _ fieldName: postImage',
    type: 'multipart/form-data',
  })
  @ApiResponse({
    status: 201,
    description: 'Image successfully uploaded',
    schema: {
      example: {
        imageName: 'post-image-12345.jpg',
      },
    },
  })
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