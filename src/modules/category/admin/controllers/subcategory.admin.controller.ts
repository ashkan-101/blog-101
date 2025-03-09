import { 
  Post, UseGuards,
  Body, Controller, 
  Delete, Get, Param, 
  ParseUUIDPipe, Patch, 
} from "@nestjs/common";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SubcategoryAdminService } from "../services/subcategory.admin.service";
import { UpdateSubcategoryDto } from "../dtos/subcategory/update-subcategory.dto";

@UseGuards(JwtAdminGuard)
@Controller('/api/v1/admin/subcategories')
export class SubcategoryAdminController {
  constructor(
    private readonly subcategoryAdminService: SubcategoryAdminService
  ) {}

  @ApiOperation({ summary: 'Create a new subcategory -- ADMIN' })
  @ApiBody({
    description: 'The data required to create a new subcategory',
    type: NewSubcategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Subcategory created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists for a subcategory',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the given ID',
  })
  @Post()
  async createSubcategory(@Body() body: NewSubcategoryDto){
    const newSubcategory = await this.subcategoryAdminService.createNewSubcategory(body);
    return newSubcategory
  }

  @ApiOperation({ summary: 'Get all subcategories for a specific category' })
  @ApiParam({
    name: 'categoryId-UUId',
    description: 'The unique ID(UUID) of the category to fetch subcategories for',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories for the specified category',
    schema: {
      example: [
        { id: 'subcat1', title: 'Subcategory 1', categoryId: 'category1' },
        { id: 'subcat2', title: 'Subcategory 2', categoryId: 'category1' },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found for the given categoryId',
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
    description: 'Forbidden - User does not have the required role (admin, superadmin).',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden' },
      }
    }
  })
  @Get(':categoryId')
  async getSubcategoriesForCategory(@Param('categoryId', ParseUUIDPipe) categoryId: string){
    const subcategories = await this.subcategoryAdminService.getSubcategoriesByCategoryId(categoryId)
    return subcategories
  }

  @ApiOperation({ summary: 'Delete a subcategory by its ID' })
  @ApiParam({
    name: 'id(UUID)',
    description: 'The unique ID(UUID) of the subcategory to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategory successfully deleted',
    schema: {
      example: { deleteResult: true },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found for the given ID',
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
    description: 'Forbidden - User does not have the required role (admin, superadmin).',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden' },
      }
    }
  })
  @Delete(':id')
  async deleteSubcategory(@Param('id', ParseUUIDPipe) id: string){
    await this.subcategoryAdminService.deleteSubcategoryById(id)

    return { deleteResult: true }
  }


  @ApiOperation({ summary: 'Update a subcategory by its ID' })
  @ApiParam({
    name: 'id(UUID)',
    description: 'The unique ID(UUID) of the subcategory to update',
    type: String,
  })
  @ApiBody({
    description: 'Updated data for the subcategory',
    type: UpdateSubcategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategory successfully updated',
    schema: {
      example: { updateResult: true },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found for the given ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - The title already exists',
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
    description: 'Forbidden - User does not have the required role (admin, superadmin).',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden' },
      }
    }
  })
  @Patch(':id')
  async updateSubcategory(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateSubcategoryDto){
    await this.subcategoryAdminService.updateSubcategoryById(id, body)

    return { updateResult: true }
  }
}
