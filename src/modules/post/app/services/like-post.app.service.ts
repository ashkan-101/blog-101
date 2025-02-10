import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikePostEntity } from "../../entities/likePost.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PostAppFactory } from "../post.app.factory";


@Injectable()
export class LikePostAppService{
  constructor(
    @InjectRepository(LikePostEntity)
    private readonly likeRepository: Repository<LikePostEntity>,
    private readonly postAppFactory: PostAppFactory

  ){}

  //-------------------------------------private methods

  private async isPostLikedByUser(postId: string, userId: string): Promise<boolean>{
    return await this.likeRepository.exists({
      where: { 
        post: { id: postId },
        user: { id: userId }
      }
    })
  }

  //-------------------------------------public methods

  public async likeOrDislikePostById(postId: string, user: UserEntity){
    const post = await this.postAppFactory.findPostById(postId)

    if(!post) throw new NotFoundException('not found any post with this Id')

    const isLiked = await this.isPostLikedByUser(postId, user.id)

    if(!isLiked){
      const newLike = this.likeRepository.create({ post, user})
      await newLike.save()
      return 'like'
    }else {
      await this.likeRepository.delete({
        post: { id: postId },
        user: { id: user.id }
      })
      return 'dislike'
    }
  }

  public async findLikesByPostId(postId: string){
    const [likes, count] = await this.likeRepository.findAndCount({ 
      where: { post: { id: postId }},
      relations: ['post', 'user'],
      select: {
        id: true,
        createdAt: true,
        post: { id: true },
        user: { id: true }
      }
    })
    return { 
      likesCount: count,
      likes
    }
  }
}