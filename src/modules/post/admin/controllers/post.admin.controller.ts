import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { PostAdminService } from "../services/post.admin.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";
import { PostSorting } from "../../enums/Post.Sorting";
import { UpdatePostDto } from "../dtos/update-post.dto";


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

  @ApiOperation({
    summary: 'Delete a post by its ID',
    description: 'Deletes a post if the requester is the author of the post.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the post to be deleted (UUID format)',
    type: String,
    example: 'd12345d3-4567-890a-bcde-fghijklmn012',
  })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
    schema: {
      type: 'object',
      properties: {
        deleteResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found or not authorized to delete',
  })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const adminId= req.user.id
    await this.postAdminService.deletePostById(id, adminId)

    return { deleteResult: true }
  }

  @ApiOperation({
    summary: 'Retrieve posts by a specific author',
    description: 'Fetches a list of posts authored by the admin with the provided author ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author (UUID format)',
    type: String,
    example: 'd12345d3-4567-890a-bcde-fghijklmn012',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found for the given author ID',
  })
  @UseGuards(JwtAdminGuard)
  @Get('/author/:id')
  async getAuthorPosts(@Param('id', ParseUUIDPipe) authorId: string){
    const posts = await this.postAdminService.findPostsByAuthorId(authorId)

    return { posts }
  }

  @ApiOperation({
    summary: 'Update an existing post',
    description: 'This endpoint allows an admin to update a post by its ID. The admin must be the author of the post.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the post to be updated (UUID format)',
  })
  @ApiBody({
    type: UpdatePostDto,
    description: 'The updated data for the post. The fields in the body should match the post properties to be updated.',
  })
  @ApiResponse({
    status: 200,
    description: 'The post was successfully updated.',
    schema: {
      type: 'object',
      properties: {
        updateResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the given ID or you are not the author of this post.',
  })
  @UseGuards(JwtAdminGuard)
  @Put(':id')
  async updatePost(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdatePostDto, @Req() req){
    const authorId = req.user.id
    await this.postAdminService.updatePostById(id, authorId, body)
    return { updateResult: true }
  }
}