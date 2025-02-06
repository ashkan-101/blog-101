import { Module } from "@nestjs/common";
import { CategoryAdminModule } from "./admin/category.admin.module";
import { CategoryAppModule } from "./app/category.app.module";


@Module({
  imports: [CategoryAdminModule, CategoryAppModule]
})
export class CategoryModule{}