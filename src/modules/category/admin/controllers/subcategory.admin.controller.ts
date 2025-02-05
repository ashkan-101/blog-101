import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { SubcategoryAdminService } from "../services/subcategory.admin.service";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { JwtGuard } from "src/modules/auth/guards/jwt.guard";
import { RoleGuard } from "src/common/guards/role.guard";
import { SetAccessRoles } from "src/common/decorators/SetAccessRoles";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/subcategory-admin')
export class SubcategoryAdminController {
  constructor(
    private readonly subcategoryAdminService: SubcategoryAdminService
  ) {}

  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiBody({
    description: 'The data required to create a new subcategory',
    type: NewSubcategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Subcategory created successfully',
    schema: {
      example: {
        id: 'sub-category-id',
        title: 'Subcategory Title',
        categoryId: 'category-id',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Title already exists for a subcategory',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the given ID',
  })
  @UseGuards(JwtGuard, RoleGuard)
  @SetAccessRoles(['admin', 'superadmin'])
  @Post('/create')
  async newSubcategory(@Body() body: NewSubcategoryDto){
    const newSubcategory = await this.subcategoryAdminService.createSubcategory(body);
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
  @Get('/subcategories/:categoryId')
  async getSubcategoriesForCategory(@Param('categoryId', ParseUUIDPipe) categoryId: string){
    const subcategories = await this.subcategoryAdminService.getSubcategoriesByCategoryId(categoryId)
    return subcategories
  }
}
