import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAdminController } from "./post.admin.controller";
import { PostAdminService } from "./post.admin.service";
import { CategoryAdminModule } from "src/modules/category/admin/category.admin.module";
import { PostAdminFactory } from "./post.admin.factory";
import { LocalDiskStorageService } from "src/common/services/storage/localDiskStorage.service";


@Module({
  controllers: [PostAdminController],
  providers: [PostAdminService, PostAdminFactory, LocalDiskStorageService],
  imports: [
    CategoryAdminModule,
    TypeOrmModule.forFeature([PostEntity])
  ]
})
export class PostAdminModule {}