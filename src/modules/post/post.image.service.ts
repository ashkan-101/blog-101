import { BadRequestException, Injectable, UnsupportedMediaTypeException } from "@nestjs/common";
import { LocalDiskStorageService } from "src/common/services/storage/providers/localDiskStorage.service";
import { contentType } from 'mime-types'

@Injectable()
export class PostImageService{
  constructor(
    private readonly diskStorageService: LocalDiskStorageService
  ){}
  //--------------------------------private methods
  private async validateImageMimeType(imageName: string){
    const mimeType = contentType(imageName)
    if(!mimeType) throw new UnsupportedMediaTypeException('Unsupported media type')
    const type = mimeType.split('/')[0]
    if(type !== 'image') throw new UnsupportedMediaTypeException('Unsupported media type')
    return mimeType
  }

  ///-------------------------------public methods
  public async saveImageAndReturnPath(files: { thumbnail?: Express.Multer.File[], postImage?: Express.Multer.File[] }){
    if(files.postImage){
      return await this.diskStorageService.upload(files.postImage[0], { path: process.env.POST_IMAGES as string})
    }else if(files.thumbnail){
      return await this.diskStorageService.upload(files.thumbnail[0], { path: process.env.THUMBNAILS as string})
    }else{
      throw new BadRequestException('please send a image')
    }
  }

  public async getImageInformations(imagePath: string ,imageName: string){
    const mimeType = await this.validateImageMimeType(imageName)
    const buffer = await this.diskStorageService.readFile(imagePath, imageName)
    return {
      mimeType,
      buffer
    }
  }

  public async deleteImage(imagePath: string, imageName: string){
    await this.validateImageMimeType(imageName)
    await this.diskStorageService.deleteFile(imagePath, imageName)
  }
}