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


@Module({
  controllers: [PostAppController, LikePostAppController, PostReportAppController],
  providers: [PostAppService, PostAppFactory, LikePostAppService, PostReportAppService],
  imports: [TypeOrmModule.forFeature([PostEntity, LikePostEntity, PostReportEntity])],
})
export class PostAppModule{}