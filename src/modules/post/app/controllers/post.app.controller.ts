import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, ParseUUIDPipe, Query, UseGuards } from "@nestjs/common";
import { PostAppService } from "../services/post.app.service";
import { PostSorting } from "../../enums/Post.Sorting";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
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
  @UseGuards(JwtAppGuard)
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

  @ApiOperation({
    summary: 'Get a single post by its ID',
    description: 'This endpoint retrieves a post by its unique ID from the database. The post details are returned along with the author details (username, email, avatar, etc.).'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the post (UUID format)',
  })
  @ApiResponse({
    status: 200,
    description: 'The post details along with author information',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the provided ID',
  })
  @UseGuards(JwtAppGuard)
  @Get(':id')
  async getPostById(@Param('id', ParseUUIDPipe) id: string){
    const post = await this.postAppService.findPostById(id)
    return { post }
  }

  @ApiOperation({
    summary: 'Get a post by its slug',
    description: 'This endpoint retrieves a post using its unique slug identifier. It returns the post details along with the author, subcategory, and category information.',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'The unique slug identifier of the post',
  })
  @ApiResponse({
    status: 200,
    description: 'The post details including author, subcategory, and category information',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the provided slug',
  })
  @UseGuards(JwtAppGuard)
  @Get('/slug/:slug')
  async getPostBySlug(@Param('slug') slug: string){
    const post = await this.postAppService.findPostBySlug(slug)
    return { post }
  }
}