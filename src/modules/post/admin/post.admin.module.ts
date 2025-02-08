import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAdminController } from "./controllers/post.admin.controller";
import { PostAdminService } from "./services/Post.admin.service";
import { CategoryAdminModule } from "src/modules/category/admin/category.admin.module";
import { PostAdminFactory } from "./post.admin.factory";


@Module({
  controllers: [PostAdminController],
  providers: [PostAdminService, PostAdminFactory],
  imports: [
    CategoryAdminModule,
    TypeOrmModule.forFeature([PostEntity])
  ]
})
export class PostAdminModule {}