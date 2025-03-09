import { Injectable } from "@nestjs/common";
import { IFindCategoryById } from "../interfaces/IFindCategoryById";
import { CategoryAdminService } from "./services/category.admin.service";


@Injectable()
export class CategoryAdminFactory {
  private readonly findCategory: IFindCategoryById
  constructor(categoryAdminService: CategoryAdminService){
    this.findCategory = categoryAdminService
  }

  public async findCategoryById(categoryId: string){
    const category = await this.findCategory.findCategoryById(categoryId)
    return category
  }
}