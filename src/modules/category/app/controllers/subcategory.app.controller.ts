import { 
  Controller, DefaultValuePipe, Get, Param, 
  ParseIntPipe, ParseUUIDPipe, Query, UseGuards 
} from "@nestjs/common";
import { SubcategoryAppService } from "../services/subcategory.app.service";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";

@UseGuards(JwtAppGuard)
@Controller('/api/v1/subcategories')
export class SubcategoryAppController {
  constructor(
    private readonly subcategoryAppService: SubcategoryAppService
  ){}
  

  @ApiOperation({ summary: 'Get a list of subcategories' })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Page number for pagination', 
    type: Number, 
    example: 1 
  })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories with pagination info.',
    schema: {
      type: 'object',
      properties: {
        totalPages: { type: 'number', description: 'Total number of pages' },
        subcategories: {
          type: 'array',
          items: { 
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Subcategory ID' },
              name: { type: 'string', description: 'Subcategory name' },
              createdAt: { type: 'string', format: 'date-time', description: 'Creation date' }
            }
          }
        }
      }
    }
  })
  @Get()
  async getSubcategories(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number){
    const {totalPages, subcategories} = await this.subcategoryAppService.findAllSubcategories(page)

    return {
      totalPages,
      subcategories
    }
  }

  @Get(':categoryId')
  async getSubcategoriesForCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ){
    const { totalPages, subcategories } = await this.subcategoryAppService.findAllSubcategoriesByCategoryId(categoryId, page)

    return { 
      totalPages,
      subcategories
    }
  }
}