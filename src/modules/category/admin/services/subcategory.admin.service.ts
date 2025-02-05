import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from "../../entities/subcategory.entity";
import { Repository } from "typeorm";
import { IFindCategoryById } from "../../interfaces/IFindCategoryById";
import { CategoryAdminService } from "./category.admin.service";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { UpdateSubcategoryDto } from "../dtos/subcategory/update-subcategory.dto";


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
  public async createNewSubcategory(params: NewSubcategoryDto) {
    await this.validateUniqueTitle(params.title)
    const category = await this.validateAndGetCategoryById(params.categoryId)

    const subcategory = this.subcategoryRepository.create({ title: params.title, category })
    return await subcategory.save()
  }

  public async getSubcategoriesByCategoryId(categoryId: string){
    const subcategories = await this.subcategoryRepository.find({
      where: { category: { id: categoryId }},
      order: { category: { createdAt: 'DESC' }},
      relations: ['category'],
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {id: true, title: true, createdAt: true}
      }
    })

    if (subcategories.length === 0) throw new NotFoundException('No subcategories found for the given categoryId');

    return subcategories
  }

  public async deleteSubcategoryById(subcategoryId: string){
    const deleteResult = await this.subcategoryRepository.delete({id: subcategoryId})
    if(deleteResult.affected === 0) throw new NotFoundException('not found any subcategory with this Id')
  }

  public async updateSubcategoryById(subcategoryId: string, params: UpdateSubcategoryDto){
    await this.validateUniqueTitle(params.title)
    const updateResult = await this.subcategoryRepository.update({ id: subcategoryId }, params)

    if(updateResult.affected === 0) throw new NotFoundException('not found any subcategory with this Id')
  }
  //------------------------------------export methods
}