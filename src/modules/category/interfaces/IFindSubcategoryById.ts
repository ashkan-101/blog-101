import { SubcategoryEntity } from "../entities/subcategory.entity";

export interface IFindSubcategoryById {
  findSubcategoryById(id: string): Promise<SubcategoryEntity | null>
}