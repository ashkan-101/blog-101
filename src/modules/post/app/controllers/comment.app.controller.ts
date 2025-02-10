import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentAppService } from "../services/comment.app.service";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller('/api/v1/post/comments')
export class CommentAppController {
  constructor(
    private readonly commentAppService: CommentAppService
  ){}
  
  @UseGuards(JwtAppGuard)
  @Post(':postId')
  async newComment(
    @Req() req,
    @Param('postId', ParseUUIDPipe) postId: string, 
    @Body() body: CreateCommentDto,
  ){
    const user = req.user
    const newComment = await this.commentAppService.createNewCommentForPost(postId, body, user)

    return { newComment }
  }

  @UseGuards(JwtAppGuard)
  @Get(':postId')
  async getComments(
    @Param('postId', ParseUUIDPipe) postId: string, 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ){
    const {comments, totalPages} = await this.commentAppService.findCommentsByPostId(postId, page)
    return { 
      totalPages,
      comments
    }
  }

  @UseGuards(JwtAppGuard)
  @Post('/reply/:id')
  async replyComment(@Param('id', ParseUUIDPipe) id: string, @Body() body: CreateCommentDto, @Req() req){
    const user = req.user
    const newReply = await this.commentAppService.createReplyForComment(id, body, user)
    return { newReply }
  }

  @UseGuards(JwtAppGuard)
  @Delete(':id')
  async deleteComment(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const userId = req.user.id
    await this.commentAppService.deleteCommentById(id, userId)
    return { deleteResult: true }
  }
}