import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentAppService } from "../services/comment.app.service";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/post/comments')
export class CommentAppController {
  constructor(
    private readonly commentAppService: CommentAppService
  ){}
  
  @ApiOperation({
    summary: 'Add a new comment to a post',
    description: 'This method allows a user to add a new comment to a specific post by providing the post ID and comment details.',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    description: 'The ID of the post to which the comment will be added.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'The data required to create a new comment.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully added the new comment.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
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

  @ApiOperation({
    summary: 'Get comments for a specific post',
    description: 'Fetch all comments associated with a specific post by its ID and page number.',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    description: 'The ID of the post for which comments are to be fetched.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number for pagination.',
    required: false,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched comments.',
    schema: {
      type: 'object',
      properties: {
        totalPages: { type: 'number', example: 5 },
        comments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '12345' },
              title: { type: 'string', example: 'Great Post!' },
              description: { type: 'string', example: 'This post was very insightful.' },
              createdAt: { type: 'string', example: '2025-02-10T14:25:00Z' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '1' },
                  name: { type: 'string', example: 'John Doe' },
                  avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
                },
              },
              replies: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '6789' },
                    title: { type: 'string', example: 'Great reply!' },
                    description: { type: 'string', example: 'I agree with your thoughts.' },
                    createdAt: { type: 'string', example: '2025-02-10T15:30:00Z' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '2' },
                        name: { type: 'string', example: 'Jane Doe' },
                        avatar: { type: 'string', example: 'https://example.com/jane-avatar.jpg' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
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

  @ApiOperation({
    summary: 'Reply to a comment',
    description: 'This method allows a user to reply to an existing comment.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the comment to which the reply will be added.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'The data required to create a reply to a comment.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully added the reply.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  @UseGuards(JwtAppGuard)
  @Post('/reply/:id')
  async replyComment(@Param('id', ParseUUIDPipe) id: string, @Body() body: CreateCommentDto, @Req() req){
    const user = req.user
    const newReply = await this.commentAppService.createReplyForComment(id, body, user)
    return { newReply }
  }

  @ApiOperation({
    summary: 'Delete a comment',
    description: 'This method allows a user to delete a comment by its ID, but only if the user is the owner of the comment.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the comment to delete.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the comment.',
    schema: {
      type: 'object',
      properties: {
        deleteResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found comment with this id or user is not the owner of the comment.',
  })
  @UseGuards(JwtAppGuard)
  @Delete(':id')
  async deleteComment(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const userId = req.user.id
    await this.commentAppService.deleteCommentById(id, userId)
    return { deleteResult: true }
  }
}