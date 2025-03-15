import { Repository } from "typeorm";
import { PostReportEntity } from "../../entities/postReport.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PostReportAdminService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly reportRepository: Repository<PostReportEntity>,
  ){}

  public async findAllPostReports(){
    const [reports, reportsCount] = await this.reportRepository.findAndCount({
      order: { createdAt: 'DESC' },
      relations: ['post', 'user', 'post.subcategory'],
      select: {
        user: { 
          id: true,
          mobile: true,
          name: true
        },
        post: {
          id: true,
          title: true,
          slug: true,
          description: true,
          createdAt: true,
          subcategory: { id: true, title: true }
        }
      }
    })
    return {
      reports,
      reportsCount
    }
  }
  
  public async deleteReportById(reportId: string){
    const deleteResult = await this.reportRepository.delete({
      id: reportId
    })

    if(deleteResult.affected === 0) throw new NotFoundException('not Found any report with this Id')
  }
}