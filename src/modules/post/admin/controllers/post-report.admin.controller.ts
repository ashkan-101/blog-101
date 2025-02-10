import { Controller, Delete, Get, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { PostReportAdminService } from "../services/post-report.admin.service";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";

@Controller('/api/v1/admin/post/reports')
export class PostReportAdminController {
  constructor(
    private readonly postReportAdminService: PostReportAdminService
  ){}

  @UseGuards(JwtAdminGuard)
  @Get()
  async getReports(){
    const {reports, reportsCount} = await this.postReportAdminService.findAllPostReports()
    return { 
      reportsCount,
      reports
     }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  async deleteReport(@Param('id', ParseUUIDPipe) id: string){
    await this.postReportAdminService.deleteReportById(id)

    return { deleteResult: true }
  }
}