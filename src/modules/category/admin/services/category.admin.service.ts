import { ConflictException, Injectable } from "@nestjs/common";
import { NewCategoryDto } from "../dtos/new-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";


@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity> 
  ){}

  //------------------------------------private methods
  private async validateUniqueTitle(title: string){
    const existingCategory  = await this.categoryRepository.exists({where: {title}})

    if(existingCategory){
      throw new ConflictException('this title already exist!')
    }
  }


  //------------------------------------public methods
  public async createCategory(params: NewCategoryDto){
    await this.validateUniqueTitle(params.title)

    const newCategory = this.categoryRepository.create(params)
    return await newCategory.save()
  }
} 