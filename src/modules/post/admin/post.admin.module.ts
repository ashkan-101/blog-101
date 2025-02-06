import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAdminController } from "./controllers/Post.admin.controller";
import { PostAdminService } from "./services/Post.admin.service";


@Module({
  controllers: [PostAdminController],
  providers: [PostAdminService],
  imports: [
    TypeOrmModule.forFeature([PostEntity])
  ]
})
export class PostAdminModule {}