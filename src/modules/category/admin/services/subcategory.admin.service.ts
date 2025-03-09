import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryAdminFactory } from "../category.admin.factory";
import { SubcategoryEntity } from "../../entities/subcategory.entity";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateSubcategoryDto } from "../dtos/subcategory/update-subcategory.dto";


@Injectable()
export class SubcategoryAdminService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    private readonly categoryAdminFactory: CategoryAdminFactory
  ){}

  //-----------------------------------private methods
  private async validateUniqueTitle(title: string){
    const existingCategory  = await this.subcategoryRepository.exists({where: {title}})

    if(existingCategory){
      throw new ConflictException('this title already exist!')
    }
  }

  //-----------------------------------public methods
  public async createNewSubcategory(params: NewSubcategoryDto) {
    await this.validateUniqueTitle(params.title)

    const category = await this.categoryAdminFactory.findCategoryById(params.categoryId)

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

  public async findSubcategoryById(id: string){
    return await this.subcategoryRepository.findOne({where: { id }})
  }
}