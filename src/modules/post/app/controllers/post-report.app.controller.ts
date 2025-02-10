import { Controller, Param, ParseUUIDPipe, Post, Req, UseGuards } from "@nestjs/common";
import { PostReportAppService } from "../services/post-report.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller('/api/v1/posts/report')
export class PostReportAppController {
  constructor(
    private readonly postReportAppService: PostReportAppService
  ){}

  @UseGuards(JwtAppGuard)
  @Post(':postId')
  async saveReport(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const user = req.user
    const newReport = await this.postReportAppService.createNewReport(postId, user)

    return { newReport }
  }
}