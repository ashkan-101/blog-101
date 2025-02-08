import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from "@nestjs/common";
import { PostAdminService } from "../services/Post.admin.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";


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


}