import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostAppFactory } from "../post.app.factory";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PostReportEntity } from "../../entities/postReport.entity";


@Injectable()
export class PostReportAppService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly reportRepository: Repository<PostReportEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}

  public async createNewReport(postId: string, user: UserEntity){
    const post = await this.postAppFactory.findPostById(postId)

    const newReport = this.reportRepository.create({ post, user })
    return await newReport.save()
  }
}