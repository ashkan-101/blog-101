import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/post.entity";
import { PostAppController } from "./controllers/post.app.controller";
import { PostAppService } from "./services/post.app.service";
import { PostAppFactory } from "./post.app.factory";


@Module({
  controllers: [PostAppController],
  providers: [PostAppService, PostAppFactory],
  imports: [TypeOrmModule.forFeature([PostEntity])]
})
export class PostAppModule{}