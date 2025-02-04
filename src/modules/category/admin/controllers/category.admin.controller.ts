import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";


@Controller('/api/v1/category-admin')
export class CategoryAdminController {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity> 
  ){}
  
}