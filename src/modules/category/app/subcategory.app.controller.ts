import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from "@nestjs/common";
import { SubcategoryAppService } from "./subcategory.app.service";


@Controller('/api/v1/subcategories')
export class SubcategoryAppController {
  constructor(
    private readonly subcategoryAppService: SubcategoryAppService
  ){}
  
  @Get()
  async getSubcategories(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number){
    const {totalPages, subcategories} = await this.subcategoryAppService.findAllSubcategories(page)

    return {
      totalPages,
      subcategories
    }
  }
}