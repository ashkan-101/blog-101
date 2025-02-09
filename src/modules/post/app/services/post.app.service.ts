import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { Repository } from "typeorm";
import { PostAppFactory } from "../post.app.factory";
import { paginateTool } from "src/common/utils/paginate.tool";
import { PostSorting } from "../../enums/Post.Sorting";
import { validate as validateUUID} from 'uuid'

@Injectable()
export class PostAppService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postAppFactory: PostAppFactory
  ){}

  //--------------------------------private methods



  //--------------------------------public methods

  public async getAllPosts(page: number, sorting: PostSorting, subcategoryId?: string){
    const pagination = paginateTool({page, take: 20})
  
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if(subcategoryId && validateUUID(subcategoryId)){
      queryBuilder.where('subcategory.id = :subcategoryId', { subcategoryId })
    }

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

  public async findPostById(postId: string){
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'subcategory', 'subcategory.category'],
      select: {
        author: {
          userName: true,
          email: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
          id: true
        }
      }
    })

    if(!post) throw new NotFoundException('not found any post with this Id')

    return post
  }

  public async findPostBySlug(slug: string){
    const post = await this.postRepository.findOne({
      where: { slug },
      relations: ['author', 'subcategory', 'subcategory.category'],
      select: {
        author: {
          userName: true,
          email: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
          id: true
        }
      }
    })

    if(!post) throw new NotFoundException('not found any post with this slug')

    return post
  }
}