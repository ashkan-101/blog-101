import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from "../../entities/subcategory.entity";
import { Repository } from "typeorm";
import { IFindCategoryById } from "../../interfaces/IFindCategoryById";
import { CategoryAdminService } from "./category.admin.service";


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


}