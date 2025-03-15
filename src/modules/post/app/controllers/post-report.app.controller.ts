import { 
  Post, Req, UseGuards,
  Controller, Param, ParseUUIDPipe
} from "@nestjs/common";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { PostReportAppService } from "../services/post-report.app.service";


@Controller('/api/v1/post/reports')
export class PostReportAppController {
  constructor(
    private readonly postReportAppService: PostReportAppService
  ){}

  @ApiOperation({ summary: 'Report a post' })
  @ApiParam({
    name: 'postId',
    description: 'The UUID of the post to be reported',
  })
  @ApiResponse({
    status: 201,
    description: 'The report was successfully created',
    schema: {
      example: {
        newReport: {
          id: 'reportId',
          post: { id: 'postId' },
          user: { id: 'userId' },
          createdAt: '2025-02-10T00:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the provided ID',
  })
  @UseGuards(JwtAppGuard)
  @Post(':postId')
  async newReport(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const user = req.user
    const newReport = await this.postReportAppService.createNewReport(postId, user)

    return { newReport }
  }
}