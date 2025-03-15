import { Repository } from "typeorm";
import { validate as validateUUID} from 'uuid'
import { InjectRepository } from "@nestjs/typeorm";
import { PostSorting } from "../../enums/Post.Sorting";
import { PostEntity } from "../../entities/post.entity";
import { paginateTool } from "src/common/utils/paginate.tool";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PostAppService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ){}

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
      .select('post')
      .addSelect([
        'author.id',
        'author.userName',
        'author.role',
        'author.email',
        'author.avatar' 
      ])
      .addSelect([
        'subcategory.id',
        'subcategory.title',
        'subcategory.createdAt'
      ])
      .addSelect([
        'category.id',
        'category.title',
        'category.createdAt'
      ])
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount()
  
    return {
      totalPages: Math.ceil(totalCount / pagination.take),
       posts
    }
  }

  public async findPostBySlug(slug: string){
    const post = await this.postRepository.createQueryBuilder('post')
    .where('post.slug = :slug', { slug })
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.subcategory', 'subcategory')
    .leftJoinAndSelect('subcategory.category', 'category')
    .leftJoinAndSelect('post.likes', 'likes')
    .leftJoinAndSelect('likes.user', 'user')
    .loadRelationCountAndMap('post.likesCount', 'post.likes')
    .select([
      'post',
      'author.userName',
      'author.email',
      'author.avatar',
      'author.role',
      'author.isActive',
      'author.createdAt',
      'author.id',
      'subcategory.id',
      'subcategory.title',
      'category.id',
      'category.title',
      'likes.id',
      'likes.createdAt',
      'user.id'
    ])
    .getOne();

    if(!post) throw new NotFoundException('not found any post with this slug')
    
    return post;
  }

  public async updatePostViewsById(postId: string){
    const updateResult = await this.postRepository
      .createQueryBuilder()
      .update('post')
      .set({ views: ()=> "views + 1"})
      .where("id = :postId", { postId })
      .execute()
    
    if(updateResult.affected === 0) throw new NotFoundException('not found any post with this Id')
  }

  //------------------------------export methods
  public async findPostById(postId: string){
    const post = await this.postRepository.findOne({ where: { id: postId }})
    if(!post){
      throw new NotFoundException('not found any post with this Id')
    }
    return post
  }
}