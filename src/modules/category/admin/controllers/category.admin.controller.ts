import { 
  Body, Request,
  Controller, 
  DefaultValuePipe, 
  Delete, Get, Param, 
  ParseIntPipe, ParseUUIDPipe, 
  Post, Query, UseGuards, 
  Patch
} from "@nestjs/common";
import { NewCategoryDto } from "../dtos/category/new-category.dto";
import { CategoryAdminService } from "../services/category.admin.service";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CategoryEntity } from "../../entities/category.entity";
import { JwtGuard } from "src/modules/auth/guards/jwt.guard";
import { Role } from "src/common/decorators/Role";
import { RoleGuard } from "src/common/guards/role.guard";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";

@Controller('/api/v1/category-admin')
export class CategoryAdminController {
  constructor(
    private readonly categoryService: CategoryAdminService
  ){}

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
  @UseGuards(JwtGuard, RoleGuard)
  @Role(['admin', 'superadmin'])
  @Post('/create')
  async createNewCategory(@Body() body: NewCategoryDto) {
    const newCategory = await this.categoryService.createCategory(body)

    return newCategory
  }

  @ApiOperation({
    summary: 'Get a paginated list of categories',
    description: 'Fetch a list of categories with pagination support. You can specify the page number with the "page" query parameter.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination. Default is 1.',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched categories list',
    schema: {
      type: 'object',
      properties: {
        totalPages: {
          type: 'number',
          description: 'The total number of pages available based on the pagination.',
        },
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Category ID' },
              title: { type: 'string', description: 'Category Title' },
              createdAt: { type: 'string', description: 'Creation timestamp of the category', format: 'date-time' },
            },
          },
        },
      },
    },
  })
  @UseGuards(JwtGuard, RoleGuard)
  @Role(['admin', 'superadmin'])
  @Get('/categories-list')
  async getAllCategories(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number){
    return await this.categoryService.getAllCategories(page)
  }


  @ApiOperation({
    summary: 'Delete a category by ID',
    description: 'Deletes a category using its unique ID. If the category is not found, a NotFoundException will be thrown.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category to be deleted.',
    type: String,
    example: '9b6b015e-9b89-4df8-9e5d-06c93920cf1b',
  })
  @ApiResponse({
    status: 200,
    description: 'The category was successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        deleteResult: {
          type: 'boolean',
          example: true,
          description: 'Indicates whether the deletion was successful.',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the provided ID.',
  })
  @UseGuards(JwtGuard, RoleGuard)
  @Role(['admin', 'superadmin'])
  @Delete('/delete/:id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string){
    await this.categoryService.deleteCategoryById(id)
    return { deleteResult: true }
  }

  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category to update',
    type: String,
  })
  @ApiBody({
    description: 'The new data for the category to be updated',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    schema: {
      example: {
        updateResult: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found for the given ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists',
  })
  @UseGuards(JwtGuard, RoleGuard)
  @Role(['admin', 'superadmin'])
  @Patch('/update/:id')
  async updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCategoryDto){
    await this.categoryService.updateCategoryById(id, body)
    return { updateResult: true }
  }
}