import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PostAppFactory } from "../post.app.factory";


@Injectable()
export class PostAppService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<UserEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}
}