import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, ParseUUIDPipe, Query, UseGuards } from "@nestjs/common";
import { PostAppService } from "../services/post.app.service";
import { PostSorting } from "../../enums/Post.Sorting";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";


@Controller('/api/v1/posts')
export class PostAppController {
  constructor(
    private readonly postAppService: PostAppService
  ){}


  @ApiOperation({
    summary: 'Get all posts with pagination and sorting options',
    description: 'This endpoint returns a paginated list of posts with the option to sort by popularity or creation date.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'The page number for pagination (default is 1)',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'sortingBy',
    description: 'Sorting criteria for posts. Options are "popular" (by views) or "newest" (by creation date)',
    required: false,
    default: 'popular',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of posts along with the total number of pages.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters for pagination or sorting.',
  })
  @UseGuards(JwtAdminGuard)
  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.POPULAR)) sortingBy: PostSorting
  ){
    const {totalPages, posts }= await this.postAppService.getAllPosts(page, sortingBy)
    return { 
      totalPages,
      posts
     }
  }

  @UseGuards(JwtAdminGuard)
  @Get(':id')
  async getPost(@Param('id', ParseUUIDPipe) id: string){
    const post = await this.postAppService.findPostById(id)
    return { post }
  }
}