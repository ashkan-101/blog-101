import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAppController } from "./controllers/post.app.controller";
import { PostAppService } from "./services/post.app.service";
import { PostAppFactory } from "./post.app.factory";
import { LikePostAppService } from "./services/like-post.app.service";
import { LikePostAppController } from "./controllers/like-post.app.controller";
import { LikePostEntity } from "../entities/likePost.entity";
import { PostReportEntity } from "../entities/postReport.entity";
import { PostReportAppController } from "./controllers/post-report.app.controller";
import { PostReportAppService } from "./services/post-report.app.service";
import { CommentEntity } from "../entities/comment.entity";
import { CommentAppController } from "./controllers/comment.app.controller";
import { CommentAppService } from "./services/comment.app.service";
import { RedisModule } from "src/common/cache/redis.module";


@Module({
  controllers: [
    PostAppController, LikePostAppController, 
    PostReportAppController, CommentAppController
  ],
  providers: [
    PostAppService, PostAppFactory, 
    LikePostAppService, PostReportAppService, 
    CommentAppService
  ],
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([PostEntity, LikePostEntity, PostReportEntity, CommentEntity])
  ],
})
export class PostAppModule{}