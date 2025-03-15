import { 
  Controller, Get, Param, 
  ParseUUIDPipe, Patch, Req, UseGuards 
} from "@nestjs/common";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { LikePostAppService } from "../services/like-post.app.service";

@Controller('/api/v1/posts/like')
export class LikePostAppController {
  constructor(
    private readonly likeAppService: LikePostAppService
  ){}

  @ApiOperation({ summary: 'Like or Dislike a post by user' })
  @ApiParam({ name: 'postId', description: 'The UUID of the post to like or dislike' })
  @ApiResponse({
    status: 200,
    description: 'Like or Dislike the post',
    schema: {
      example: {
        likeResult: 'like or dislike',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the provided ID',
  })
  @UseGuards(JwtAppGuard)
  @Patch(':postId')
  async like(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const user = req.user
    const likeResult = await this.likeAppService.likeOrDislikePostById(postId, user)

    return { likeResult }
  }

  @ApiOperation({ summary: 'Get the likes for a specific post' })
  @ApiParam({
    name: 'postId',
    description: 'The UUID of the post to get the likes for',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the likes of the post along with the current user ID',
    schema: {
      example: {
        likes: [
          { id: 'likeId1', user: { id: 'userId1' }},
          { id: 'likeId2', user: { id: 'userId2' }},
        ],
        likesCount: 2,
        currentUser: 'currentUserId',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found with the provided ID',
  })
  @UseGuards(JwtAppGuard)
  @Get(':postId')
  async getPostLikes(@Param('postId', ParseUUIDPipe) postId: string, @Req() req){
    const { likesCount, likes } = await this.likeAppService.findLikesByPostId(postId)
    return { 
      likes,
      likesCount,
      currentUser: req.user.id
     }
  }
}
