import { CategoryEntity } from "../entities/category.entity";


export interface IFindCategoryById {
  findCategoryById(categoryId: string): Promise<CategoryEntity>
}