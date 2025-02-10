import { Controller, Get, Param, ParseUUIDPipe, Patch, Req, UseGuards } from "@nestjs/common";
import { LikePostAppService } from "../services/like-post.app.service";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";

@Controller('/api/v1/posts/like')
export class LikePostAppController {
  constructor(
    private readonly likeAppService: LikePostAppService
  ){}

  @UseGuards(JwtAppGuard)
  @Patch(':postId')
  async like(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const user = req.user
    const likeResult = await this.likeAppService.likeOrDislikePostById(postId, user)

    return { likeResult }
  }

  @UseGuards(JwtAppGuard)
  @Get(':postId')
  async getPostLikes(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const likes = await this.likeAppService.findLikesByPostId(postId)
    return { 
      likes,
      currentUser: req.user.id
     }
  }
}
