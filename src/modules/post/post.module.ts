import { Module } from "@nestjs/common";
import { PostAdminModule } from "./admin/post.admin.module";
import { PostImagesController } from "./post.images.controller";
import { LocalDiskStorageService } from "src/common/services/storage/localDiskStorage.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerOptions } from "src/common/configs/multer/multerConfig";
import { PostImageService } from "./post.image.service";
import { PostAppModule } from "./app/post.app.module";
import { AuthAdminModule } from "../auth/admin/auth.admin.module";

@Module({
  controllers: [PostImagesController],
  imports: [
    AuthAdminModule,
    PostAdminModule, PostAppModule,
    MulterModule.register(multerOptions),
  ],
  providers: [LocalDiskStorageService, PostImageService]
})
export class PostModule{}