import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostReportEntity } from "../../entities/postReport.entity";
import { Repository } from "typeorm";
import { PostAppFactory } from "../post.app.factory";
import { UserEntity } from "src/modules/user/entities/user.entity";


@Injectable()
export class PostReportAppService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly reportRepository: Repository<PostReportEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}

  public async createNewReport(postId: string, user: UserEntity){
    const post = await this.postAppFactory.findPostById(postId)
    if(!post) throw new NotFoundException('not found any post with this Id')

    const newReport = this.reportRepository.create({ post, user })
    return await newReport.save()
  }
}