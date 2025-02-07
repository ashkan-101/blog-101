import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { join, parse } from "path";
import { FieldName } from "./enums/FieldName";

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination(req, file, cb){
      if(file.fieldname === FieldName.AVATAR){
        cb(null, join(process.cwd(), 'public', 'avatars'))
      }else if(file.fieldname === FieldName.POSTIMAGE){
        cb(null, join(process.cwd(), 'public', 'postImages'))
      }else if(file.fieldname === FieldName.THUMBNAIL){
        cb(null, join(process.cwd(), 'public', 'thumbnails'))
      }
    },
    filename(req, file, callback){
      const fieldName = file.fieldname
      const extName = parse(file.filename).ext
      callback(null, `${fieldName}-${Date.now()}${extName}`)
    },
  }),
  fileFilter(req, file, callback) {
    
  },
}