import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./controllers/category.admin.controller";
import { CategoryAdminService } from "./services/category.admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { AuthModule } from "src/modules/auth/auth.module";
import { SubcategoryAdminController } from "./controllers/subcategory.admin.controller";
import { SubcategoryAdminService } from "./services/subcategory.admin.service";
import { SubcategoryEntity } from "../entities/subcategory.entity";
import { AuthAdminModule } from "src/modules/auth/admin/auth.admin.module";

@Module({
  controllers: [CategoryAdminController, SubcategoryAdminController],
  providers: [CategoryAdminService, SubcategoryAdminService],
  imports: [
    AuthAdminModule,
    TypeOrmModule.forFeature([CategoryEntity, SubcategoryEntity]),
  ]
})
export class CategoryAdminModule {}