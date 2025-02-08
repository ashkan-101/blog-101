import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../../entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { PostAdminFactory } from "../post.admin.factory";

@Injectable()
export class PostAdminService{
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postAdminFactory: PostAdminFactory
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
    })
    
    if(!post) throw new NotFoundException('not found anu post with this id')
    
    return post
  }
}