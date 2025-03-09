import { 
  Body, Controller, 
  DefaultValuePipe, 
  Delete, Get, Param, Put, 
  ParseIntPipe, ParseUUIDPipe, 
  Post, Query, UseGuards,
} from "@nestjs/common";
import { CategoryEntity } from "../../entities/category.entity";
import { NewCategoryDto } from "../dtos/category/new-category.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { CategoryAdminService } from "../services/category.admin.service";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAdminGuard)
@Controller('/api/v1/admin/categories')
export class CategoryAdminController {
  constructor(
    private readonly categoryService: CategoryAdminService
  ){}

  @ApiOperation({ summary: 'Create a new category -- ADMIN' })
  @ApiBody({ type: NewCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: CategoryEntity, 
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid data provided',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - subcategory title already exists',
  })
  @Post()
  async createCategory(@Body() body: NewCategoryDto) {
    const newCategory = await this.categoryService.createNewCategory(body)
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
    description: 'Successfully fetched categories list and total pages count',
  })
  @Get()
  async getCategories(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number){
    const {totlaPages, categories} = await this.categoryService.findAllCategories(page)
    return {
      totlaPages,
      categories
    }
  }


  @ApiOperation({
    summary: 'Delete a category by ID',
    description: 'Deletes a category using its unique ID by ADMIN',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier(UUID) of the category to be deleted.',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'The category was successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the provided ID.',
  })
  @Delete(':id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string){
    await this.categoryService.deleteCategoryById(id)
    return { deleteResult: true }
  }

  @ApiOperation({ summary: 'Update a category by ID -- ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'The ID(UUID) of the category to update',
    type: String,
  })
  @ApiBody({
    description: 'The new data for the category to be updated',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found for the given ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists',
  })
  @Put(':id')
  async updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCategoryDto){
    await this.categoryService.updateCategoryById(id, body)
    return { updateResult: true }
  }
}