import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from "../../entities/subcategory.entity";
import { Repository } from "typeorm";
import { IFindCategoryById } from "../../interfaces/IFindCategoryById";
import { CategoryAdminService } from "./category.admin.service";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";


@Injectable()
export class SubcategoryAdminService {
  private readonly findCategory: IFindCategoryById
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    categoryAdminService: CategoryAdminService
  ){
    this.findCategory = categoryAdminService
  }

  //-----------------------------------private methods
  private async validateUniqueTitle(title: string){
    const existingCategory  = await this.subcategoryRepository.exists({where: {title}})

    if(existingCategory){
      throw new ConflictException('this title already exist!')
    }
  }

  private async validateAndGetCategoryById(categoryId: string){
    const category = await this.findCategory.findCategoryById(categoryId)

    if(!category) throw new NotFoundException('not found any category with this Id')

    return category
  }

  //-----------------------------------public methods
  public async createSubcategory(params: NewSubcategoryDto) {
    await this.validateUniqueTitle(params.title)
    const category = await this.validateAndGetCategoryById(params.categoryId)

    const subcategory = this.subcategoryRepository.create({ title: params.title, category })
    return await subcategory.save()
  }

  public async getSubcategoriesByCategoryId(categoryId: string){
    return await this.subcategoryRepository.find({
      where: { category: { id: categoryId }},
      order: { category: { createdAt: 'DESC' }}
    })
  }

  //------------------------------------export methods
}