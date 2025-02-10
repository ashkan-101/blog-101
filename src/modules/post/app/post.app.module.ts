import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAppController } from "./controllers/post.app.controller";
import { PostAppService } from "./services/post.app.service";
import { PostAppFactory } from "./post.app.factory";
import { LikePostAppService } from "./services/like-post.app.service";
import { LikePostAppController } from "./controllers/like-post.app.controller";
import { LikePostEntity } from "../entities/likePost.entity";


@Module({
  controllers: [PostAppController, LikePostAppController],
  providers: [PostAppService, PostAppFactory, LikePostAppService],
  imports: [TypeOrmModule.forFeature([PostEntity, LikePostEntity])],
})
export class PostAppModule{}