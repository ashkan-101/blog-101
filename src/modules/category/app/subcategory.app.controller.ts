import { Controller } from "@nestjs/common";
import { SubcategoryAppService } from "./subcategory.app.service";


@Controller('/api/v1/subcategory')
export class SubcategoryAppController {
  constructor(
    private readonly subcategoryAppService: SubcategoryAppService
  ){}
  
}