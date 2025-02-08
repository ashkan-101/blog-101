import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res, Delete, UseGuards, NotFoundException, StreamableFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Express, Response } from "express";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { join } from "path";

import { PostImageService } from "./post.image.service";

@Controller('/api/v1/posts/images')
export class PostImagesController{
  constructor(
    private readonly postImageService: PostImageService
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
        imagePath: 'post-images',
        imageName: '12345.jpg',
      },
    },
  })
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(FileInterceptor('postImage'))
  @Post('/admin')
  async uploadImage(@UploadedFile() image: Express.Multer.File){
    const imagePath = await this.postImageService.saveImageAndReturnPath(image)
    return { 
      imagePath
    }
  }

  @Get('/:path/:name')
  async getImage (@Param('path') imagePath: string, @Param('name') imageName: string, @Res() res: Response){
    const fileInformation = await this.postImageService.getImageInformation(imagePath, imageName)
    return res.setHeader('Content-Type', fileInformation.mimeType).send(fileInformation.buffer)
  }

  @UseGuards(JwtAdminGuard)
  @Delete('/admin/:path/:name')
  async deleteImage(@Param('path') imagePath: string, @Param('name') imageName: string){
    await this.postImageService.deleteImage(imagePath, imageName)
    return { deleteResult: true }
  }
}