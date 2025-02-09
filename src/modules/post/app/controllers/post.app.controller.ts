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
    summary: 'Get a list of posts',
    description: 'Retrieve a paginated list of posts, optionally sorted by popularity or newest. Can also filter by subcategory.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of posts successfully retrieved.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default is 1)',
    example: 1
  })
  @ApiQuery({
    name: 'sortingBy',
    required: false,
    enum: PostSorting,
    description: 'Sorting criteria: either by "POPULAR" or "NEWEST" (default is POPULAR)',
    example: PostSorting.POPULAR
  })
  @ApiQuery({
    name: 'subcategoryId',
    required: false,
    type: String,
    description: 'Filter posts by subcategory ID. If provided, should be a valid UUID.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @UseGuards(JwtAppGuard)
  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.POPULAR)) sortingBy: PostSorting,
    @Query('subcategoryId') subcategoryId?: string
  ){
    const {totalPages, posts }= await this.postAppService.getAllPosts(page, sortingBy, subcategoryId)
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