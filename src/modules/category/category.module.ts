import { Module } from "@nestjs/common";
import { CategoryAdminModule } from "./admin/category.admin.module";


@Module({
  imports: [CategoryAdminModule]
})
export class CategoryModule{}