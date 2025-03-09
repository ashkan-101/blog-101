import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from "../../entities/subcategory.entity";
import { paginateTool } from "src/common/utils/paginate.tool";

@Injectable()
export class SubcategoryAppService  {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>
  ){}

  //-------------------------------------public methods

  public async findAllSubcategories(page: number): Promise<{totalPages: number, subcategories: SubcategoryEntity[]}>{
    const pagination = paginateTool({page, take: 20})

    const [subcategories, totalCount] = await this.subcategoryRepository.findAndCount({
      order: {createdAt: 'DESC'},
      relations: ['category'],
      take: pagination.take, skip: pagination.skip,
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          id: true,
          title: true
        }
      }
    })

    return {
      totalPages: Math.ceil(totalCount / pagination.take),
      subcategories
    }
  }

  public async findAllSubcategoriesByCategoryId(categoryId: string, page: number) {
    const pagination = paginateTool({page, take: 20})

    const [subcategories, totalCount] = await this.subcategoryRepository.findAndCount({
      where: { category: { id: categoryId }},
      relations: ['category'],
      order:  {createdAt: 'DESC' },
      take: pagination.take, skip: pagination.skip,
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          id: true,
          title: true
        }
      }
    })

    return {
      totalPages: Math.ceil(totalCount / pagination.take),
      subcategories
    }
  }
}