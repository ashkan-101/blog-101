import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SubcategoryAdminService } from "../services/subcategory.admin.service";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { JwtGuard } from "src/modules/auth/guards/jwt.guard";
import { RoleGuard } from "src/common/guards/role.guard";
import { SetAccessRoles } from "src/common/decorators/SetAccessRoles";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";


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
}
