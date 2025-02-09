import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { PostAdminService } from "../services/post.admin.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";
import { PostSorting } from "../../enums/Post.Sorting";


@Controller('/api/v1/admin/posts')
export class PostAdminController{
  constructor(
    private readonly postAdminService: PostAdminService
  ){}

  @ApiOperation({ summary: 'Create a new post -- admin' })
  @ApiBody({
    description: 'The data required to create a new post',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found.',
  })
  @UseGuards(JwtAdminGuard)
  @Post()
  async createPost(@Body() body: CreatePostDto, @Req() req){
    const admin = req.user
    const newPost = await this.postAdminService.createNewPost(body, admin)
    return { newPost }
  }

  @ApiOperation({ summary: 'Get a post by its ID -- admin' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the post (UUID)',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the post.',
    type: PostEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @Get(':id')
  async getPost(@Param('id', ParseUUIDPipe) postId: string){
    const post = await this.postAdminService.findPostById(postId)
    return { post }
  }

  @ApiOperation({
    summary: 'Retrieve all posts with pagination and sorting options',
    description: 'Fetches a list of posts based on the given page and sorting criteria (by popularity or newest)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'sortingBy',
    required: false,
    description: 'Sorting criteria for the posts (default: POPULAR)',
    enum: PostSorting,
    example: PostSorting.POPULAR,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched posts',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters',
  })
  @UseGuards(JwtAdminGuard)
  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sortingBy', new DefaultValuePipe(PostSorting.POPULAR)) sortingBy: PostSorting
  ){
    const posts = await this.postAdminService.getAllPosts(page, sortingBy)
    return { posts }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const adminId= req.user.id
    await this.postAdminService.deletePostById(id, adminId)

    return { deleteResult: true }
  }
}