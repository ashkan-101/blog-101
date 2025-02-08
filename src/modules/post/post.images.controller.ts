import { Controller, Get, Param, Post, UseInterceptors, Res, Delete, UseGuards, UploadedFiles } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { PostImageService } from "./post.image.service";
import { Response } from "express";

@Controller('/api/v1/posts/images')
export class PostImagesController{
  constructor(
    private readonly postImageService: PostImageService
  ){}


  @ApiOperation({ summary: 'Upload thumbnail and post image by admin' })
  @ApiConsumes('multipart/form-data')  // This indicates that the request will contain form-data
  @ApiBody({
    description: 'Upload a thumbnail and a post image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        thumbnail: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        postImage: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Images uploaded successfully.',
    schema: {
      type: 'object',
      properties: {
        imagePath: { type: 'object', example: {imagePath: "string", imageName: 'string'} },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or file format.',
  })
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(FileFieldsInterceptor([{name: 'thumbnail'},{name: 'postImage'}]))
  @Post('/admin')
  async uploadImage(@UploadedFiles() files: { thumbnail?: Express.Multer.File[], postImage?: Express.Multer.File[] }){
    const imagePath = await this.postImageService.saveImageAndReturnPath(files)
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