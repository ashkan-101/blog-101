import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./controllers/category.admin.controller";
import { CategoryAdminService } from "./services/category.admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
  controllers: [CategoryAdminController],
  providers: [CategoryAdminService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CategoryEntity]),
  ]
})
export class CategoryAdminModule {}