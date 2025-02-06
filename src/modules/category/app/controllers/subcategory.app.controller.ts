import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { SubcategoryAppService } from "../services/subcategory.app.service";
import { JwtGuard } from "src/modules/auth/guards/jwt.guard";
import { SetAccessRoles } from "src/common/decorators/SetAccessRoles";
import { RoleGuard } from "src/common/guards/role.guard";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";


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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token is missing or invalid.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User does not have the required role (admin, superadmin, or user).',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden' },
      }
    }
  })
  @UseGuards(JwtGuard, RoleGuard)
  @SetAccessRoles(['admin', 'superadmin', 'user'])
  @Get()
  async getSubcategories(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number){
    const {totalPages, subcategories} = await this.subcategoryAppService.findAllSubcategories(page)

    return {
      totalPages,
      subcategories
    }
  }
}