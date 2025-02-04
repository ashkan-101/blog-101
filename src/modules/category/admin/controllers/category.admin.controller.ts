import { Body, Controller, Post } from "@nestjs/common";
import { NewCategoryDto } from "../dtos/new-category.dto";
import { CategoryAdminService } from "../services/category.admin.service";


@Controller('/api/v1/category-admin')
export class CategoryAdminController {
  constructor(
    private readonly categoryService: CategoryAdminService
  ){}

  @Post('/create')
  async createNewCategory(@Body() body: NewCategoryDto) {
    const newCategory = await this.categoryService.createCategory(body)

    return newCategory
  }  
}