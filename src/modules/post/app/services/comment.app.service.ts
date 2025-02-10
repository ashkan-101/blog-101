import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "../../entities/comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PostAppFactory } from "../post.app.factory";
import { paginateTool } from "src/common/utils/paginate.tool";


@Injectable()
export class CommentAppService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}

  public async createNewCommentForPost(postId: string, params: CreateCommentDto, user: UserEntity){
    const post = await this.postAppFactory.findPostById(postId)
    if(!post) throw new NotFoundException('not found any post with this Id')

    const createComment = this.commentRepository.create({
      user,
      post,
      ...params
    })
    return await createComment.save()
  }

  public async findCommentsByPostId(postId: string, page: number){
    const pagination = paginateTool({page, take: 10})
    const [comments, totalCount] = await this.commentRepository.findAndCount({
      where: { post: { id: postId }},
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        user: {
          id: true,
          name: true,
          avatar: true
        },
        replies: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          user: {
            id: true,
            name: true,
            avatar: true
          }
        },
      },
      take: pagination.take,
      skip: pagination.skip
    })
    return {
      totalPages: Math.ceil(totalCount / pagination.take),
      comments
    }
  }

  public async createReplyForComment(commentId: string, params: CreateCommentDto, user: UserEntity){
    const comment = await this.commentRepository.findOne({where: { id: commentId }})
    if(!comment) throw new NotFoundException('not found any comment with this Id')

    const newReply = this.commentRepository.create({
      user,
      parent: comment,
      ...params
    })
    return await newReply.save()
  }

  public async deleteCommentById(commentId: string, userId: string){
    const deleteResult = await this.commentRepository.delete({
      id: commentId,
      user: { id: userId }
    })
    if(deleteResult.affected === 0) throw new NotFoundException('not found any comment with this Id or userId')
  }
}