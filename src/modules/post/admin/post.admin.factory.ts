import { Injectable } from "@nestjs/common";
import { SubcategoryAdminService } from "src/modules/category/admin/services/subcategory.admin.service";
import { IFindSubcategoryById } from "src/modules/category/interfaces/IFindSubcategoryById";


@Injectable()
export class PostAdminFactory {
  private readonly findSubcategory: IFindSubcategoryById
  constructor(subcategoryService: SubcategoryAdminService){
    this.findSubcategory = subcategoryService
  }

  public async findSubcategoryById(id: string){
    return await this.findSubcategory.findSubcategoryById(id)
  }
}