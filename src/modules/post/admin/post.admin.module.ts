import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAdminController } from "./controllers/post.admin.controller";
import { PostAdminService } from "./services/post.admin.service";
import { CategoryAdminModule } from "src/modules/category/admin/category.admin.module";
import { PostAdminFactory } from "./post.admin.factory";
import { LocalDiskStorageService } from "src/common/services/storage/providers/localDiskStorage.service";
import { PostReportAdminController } from "./controllers/post-report.admin.controller";
import { PostReportAdminService } from "./services/post-report.admin.service";
import { PostReportEntity } from "../entities/postReport.entity";
import { AuthAdminModule } from "src/modules/auth/admin/auth.admin.module";

@Module({
  controllers: [PostAdminController, PostReportAdminController],
  providers: [PostAdminService, PostAdminFactory, LocalDiskStorageService, PostReportAdminService],
  imports: [
    CategoryAdminModule, AuthAdminModule,
    TypeOrmModule.forFeature([PostEntity, PostReportEntity])
  ]
})
export class PostAdminModule {}