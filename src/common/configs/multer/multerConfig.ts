import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { join, parse } from "path";
import { FieldName } from "./enums/FieldName";
import { BadRequestException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'

export const multerOptions: MulterOptions = {
  // storage: diskStorage({
  //   destination(req, file, cb){
  //     if(file.fieldname === FieldName.AVATAR){
  //       cb(null, join(process.cwd(), 'uploads', 'avatars'))
  //     }else if(file.fieldname === FieldName.POSTIMAGE){
  //       cb(null, join(process.cwd(), 'uploads', 'post-images'))
  //     }else if(file.fieldname === FieldName.THUMBNAIL){
  //       cb(null, join(process.cwd(), 'uploads', 'thumbnails'))
  //     }
  //   },
  //   filename(req, file, callback){
  //     const fieldName = file.fieldname
  //     const extName = parse(file.originalname).ext
  //     callback(null, `${fieldName}-${uuidv4()}${extName}`)
  //   },
  // }),
  fileFilter(req, file, callback) {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(new BadRequestException('Invalid file type'), false);
    }
    callback(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }
}