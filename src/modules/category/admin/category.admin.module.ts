import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./controllers/category.admin.controller";
import { CategoryAdminService } from "./services/category.admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { JwtModule } from "src/common/guards/jwt/jwt.module";

@Module({
  controllers: [CategoryAdminController],
  providers: [CategoryAdminService],
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([CategoryEntity]),
  ]
})
export class CategoryAdminModule {}