import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SubcategoryAdminService } from "../services/subcategory.admin.service";
import { NewSubcategoryDto } from "../dtos/subcategory/new-subcategory.dto";
import { JwtGuard } from "src/modules/auth/guards/jwt.guard";
import { RoleGuard } from "src/common/guards/role.guard";
import { SetAccessRoles } from "src/common/decorators/SetAccessRoles";


@Controller('/api/v1/subcategory-admin')
export class SubcategoryAdminController {
  constructor(
    private readonly subcategoryAdminService: SubcategoryAdminService
  ) {}

  @UseGuards(JwtGuard, RoleGuard)
  @SetAccessRoles(['admin', 'superadmin'])
  @Post('/create')
  async newSubcategory(@Body() body: NewSubcategoryDto){
    const newSubcategory = await this.subcategoryAdminService.createSubcategory(body);
    return newSubcategory
  }
}