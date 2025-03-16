import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostSorting } from "../../enums/Post.Sorting";
import { UpdatePostDto } from "../dtos/update-post.dto";
import { CreatePostDto } from "../dtos/create-post.dto";
import { PostEntity } from "../../entities/post.entity";
import { PostAdminFactory } from "../post.admin.factory";
import { PostImageType } from "../../types/post.images.type";
import { paginateTool } from "src/common/utils/paginate.tool";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { LocalDiskStorageService } from "src/common/services/storage/providers/localDiskStorage.service";

@Injectable()
export class PostAdminService{
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postAdminFactory: PostAdminFactory,
    private readonly diskStorageService: LocalDiskStorageService
  ){}

  //--------------------------------private methods

  private async slugGenerator(title: string){
    const newSlug = title.replaceAll(' ', '-')+'-'+Math.random().toString(16).slice(3,9)
    const validateUniqueSlug = await this.postRepository.findOne({ where: { slug: newSlug }})
    if(validateUniqueSlug){
      await this.slugGenerator(title)
    }
    return newSlug
  }

  private async deletePostImages(thumbnail?: PostImageType, gallery?: PostImageType[]){
    if(thumbnail){
      await this.diskStorageService.deleteFile(thumbnail.imagePath, thumbnail.imageName)
    }else if(gallery){
      for (const image of gallery){
        await this.diskStorageService.deleteFile(image.imagePath, image.imageName)
      }
    }
  }
  //-------------------------------public methods

  public async createNewPost(params: CreatePostDto, author: AdminEntity){
    const subcategory = await this.postAdminFactory.findSubcategoryById(params.subcategory)
    if(!subcategory) throw new NotFoundException('not found any subcategory with this Id')

    const slug = await this.slugGenerator(params.title)
    const newPost = this.postRepository.create({ 
      ...params, 
      author, 
      subcategory,
      slug
    })
    return await newPost.save()
  }

  public async findPostById(postId: string){
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'subcategory', 'subcategory.category'],
      select: {
        author: {
          id: true,
          userName: true,
          email: true,
          avatar: true,
          role: true
        },
        subcategory: {
          id: true,
          createdAt: true,
          title: true,
          category: {
            id: true,
            createdAt: true,
            title: true
          }
        }
      }
    })
    
    if(!post) throw new NotFoundException('not found any post with this id')
    
    return post
  }

  public async findAllPosts(page: number, sorting: PostSorting){
    const pagination = paginateTool({page, take: 20})

    const queryBuilder = this.postRepository.createQueryBuilder('post');

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

  public async deletePostById(postId: string, authorId: string){
    const post = await this.postRepository.findOne({ where: {id: postId,author: { id: authorId }}})

    if(!post) throw new NotFoundException('not found any post with this Id')

    await this.deletePostImages(post.thumbnail, post.gallery)

    await this.postRepository.remove(post)
  }
  
  public async findPostsByAuthorId(authorId: string){
    const posts = await this.postRepository.find({
      where: { author: { id: authorId } },
      relations: ['author', 'subcategory', 'subcategory.category'],
      order: { createdAt: 'DESC' }
    })
    
    return posts
  }

  public async updatePostById(postId: string, authorId: string, params: UpdatePostDto){
    const updateResult = await this.postRepository.update({ id: postId, author: { id: authorId } }, params)
    if(updateResult.affected === 0) throw new NotFoundException('not Found any post with this Id')
  }
}