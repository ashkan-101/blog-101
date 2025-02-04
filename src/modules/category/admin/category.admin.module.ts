import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./controllers/category.admin.controller";
import { CategoryAdminService } from "./services/category.admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";


@Module({
  controllers: [CategoryAdminController],
  providers: [CategoryAdminService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity])
  ]
})
export class CategoryAdminModule {}