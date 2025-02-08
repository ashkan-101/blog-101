import { Module } from "@nestjs/common";
import { PostAdminModule } from "./admin/post.admin.module";
import { PostImagesController } from "./post.images.controller";
import { LocalDiskStorageService } from "src/common/services/storage/localDiskStorage.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerOptions } from "src/common/configs/multer/multerConfig";

@Module({
  controllers: [PostImagesController],
  imports: [
    PostAdminModule,
    MulterModule.register(multerOptions),
  ],
  providers: [LocalDiskStorageService]
})
export class PostModule{}