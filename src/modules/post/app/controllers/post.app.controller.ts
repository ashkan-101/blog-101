import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { PostAppService } from "../services/post.app.service";
import { PostSorting } from "../../enums/Post.Sorting";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller()
export class PostAppController {
  constructor(
    private readonly postAppService: PostAppService
  ){}

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
}