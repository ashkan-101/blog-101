import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostAdminService{
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ){}
}