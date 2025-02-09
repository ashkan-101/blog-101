import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PostAppFactory } from "../post.app.factory";
import { paginateTool } from "src/common/utils/paginate.tool";
import { PostSorting } from "../../enums/Post.Sorting";


@Injectable()
export class PostAppService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<UserEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}

  //--------------------------------private methods



  //--------------------------------public methods

  public async getAllPosts(page: number, sorting: PostSorting){
    const pagination = paginateTool({page, take: 20})
  
    const queryBuilder = this.postRepository.createQueryBuilder('post');
  
    if(sorting === PostSorting.NEWEST) queryBuilder.orderBy('post.createdAt', 'DESC')
    if(sorting === PostSorting.POPULAR) queryBuilder.orderBy('post.views', 'DESC')
  
    const [posts, totalCount] = await queryBuilder
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount()
  
      return {
        totalPages: Math.ceil(totalCount / pagination.take),
        posts
      }
  }
}