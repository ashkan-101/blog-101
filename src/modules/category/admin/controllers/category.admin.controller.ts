import { Body, Controller, Post } from "@nestjs/common";
import { NewCategoryDto } from "../dtos/new-category.dto";
import { CategoryAdminService } from "../services/category.admin.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryEntity } from "../../entities/category.entity";


@Controller('/api/v1/category-admin')
export class CategoryAdminController {
  constructor(
    private readonly categoryService: CategoryAdminService
  ){}


  @ApiTags('Admin - Category Management')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: NewCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: CategoryEntity, 
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid data provided',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Category title already exists',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @Post('/create')
  async createNewCategory(@Body() body: NewCategoryDto) {
    const newCategory = await this.categoryService.createCategory(body)

    return newCategory
  }  
}