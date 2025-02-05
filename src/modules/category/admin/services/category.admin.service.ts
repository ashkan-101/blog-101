import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { NewCategoryDto } from "../dtos/category/new-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";
import { paginateTool } from "src/common/utils/pagination";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";


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
  public async createNewCategory(params: NewCategoryDto){
    await this.validateUniqueTitle(params.title)

    const newCategory = this.categoryRepository.create(params)
    return await newCategory.save()
  }

  public async findAllCategories(page: number){
    const pagination = paginateTool({page, take: 20})

    const [categories, totalCount] = await this.categoryRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take: pagination.take, skip: pagination.skip,
    })

    return {
      totlaPages: Math.ceil(totalCount / pagination.take),
      categories
    }
  }

  public async deleteCategoryById(categoryId: string): Promise<void>{
    const deleteResult = await this.categoryRepository.delete({id: categoryId})
    if(deleteResult.affected === 0) throw new NotFoundException('not found any category with this ID')
  }

  public async updateCategoryById(categoryId: string, params: UpdateCategoryDto){
    await this.validateUniqueTitle(params.title)
    
    const updateResult = await this.categoryRepository.update({id: categoryId}, params)
    if(updateResult.affected === 0) throw new NotFoundException('not found any category with this ID')
  }

  //-----------------------------------export methods
  public async findCategoryById(categoryId: string): Promise<null | CategoryEntity>{
    return await this.categoryRepository.findOne({where: { id: categoryId }})
  }
} 