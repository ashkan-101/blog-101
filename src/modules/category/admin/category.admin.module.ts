import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { SubcategoryEntity } from "../entities/subcategory.entity";
import { CategoryAdminService } from "./services/category.admin.service";
import { AuthAdminModule } from "src/modules/auth/admin/auth.admin.module";
import { SubcategoryAdminService } from "./services/subcategory.admin.service";
import { CategoryAdminController } from "./controllers/category.admin.controller";
import { SubcategoryAdminController } from "./controllers/subcategory.admin.controller";
import { CategoryAdminFactory } from "./category.admin.factory";

@Module({
  controllers: [CategoryAdminController, SubcategoryAdminController],
  providers: [CategoryAdminService, SubcategoryAdminService, CategoryAdminFactory],
  imports: [
    AuthAdminModule,
    TypeOrmModule.forFeature([CategoryEntity, SubcategoryEntity]),
  ],
  exports: [SubcategoryAdminService]
})
export class CategoryAdminModule {}