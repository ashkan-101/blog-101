import { Controller, Delete, Get, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { PostReportAdminService } from "../services/post-report.admin.service";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('/api/v1/admin/post/reports')
export class PostReportAdminController {
  constructor(
    private readonly postReportAdminService: PostReportAdminService
  ){}

  @ApiOperation({ summary: 'Get all post reports for admin' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the reports and their count',
  })
  @UseGuards(JwtAdminGuard)
  @Get()
  async getReports(){
    const {reports, reportsCount} = await this.postReportAdminService.findAllPostReports()
    return { 
      reportsCount,
      reports
    }
  }

  @ApiOperation({ summary: 'Delete a report by ID -- admin' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the report to be deleted',
  })
  @ApiResponse({
    status: 200,
    description: 'Report was successfully deleted',
    schema: {
      example: {
        deleteResult: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found with the provided ID',
  })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  async deleteReport(@Param('id', ParseUUIDPipe) id: string){
    await this.postReportAdminService.deleteReportById(id)

    return { deleteResult: true }
  }
}