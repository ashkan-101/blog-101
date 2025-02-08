import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res, Delete, UseGuards, NotFoundException, StreamableFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
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

  @ApiOperation({ summary: 'Retrieve image by path and name' })
  @ApiParam({ name: 'path', description: 'Path to the image', type: String })
  @ApiParam({ name: 'name', description: 'Image file name', type: String })
  @ApiResponse({
    status: 200,
    description: 'The image file has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Image not found.',
  })
  @ApiResponse({
    status: 415,
    description: 'Unsupported media type.',
  })
  @Get('/:path/:name')
  async getImage (@Param('path') imagePath: string, @Param('name') imageName: string, @Res() res: Response){
    const fileInformation = await this.postImageService.getImageInformations(imagePath, imageName)
    return res.setHeader('Content-Type', fileInformation.mimeType).send(fileInformation.buffer)
  }

  @ApiOperation({ summary: 'Delete an image by path and name -- admin' })
  @ApiParam({ name: 'path', description: 'Path to the image', type: String })
  @ApiParam({ name: 'name', description: 'Image file name', type: String })
  @ApiResponse({
    status: 200,
    description: 'Image successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        deleteResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Image not found.',
  })
  @ApiResponse({
    status: 415,
    description: 'Unsupported media type.',
  })
  @UseGuards(JwtAdminGuard)
  @Delete('/admin/:path/:name')
  async deleteImage(@Param('path') imagePath: string, @Param('name') imageName: string){
    await this.postImageService.deleteImage(imagePath, imageName)
    return { deleteResult: true }
  }
}