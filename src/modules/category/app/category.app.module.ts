import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubcategoryAppController } from "./controllers/subcategory.app.controller";
import { SubcategoryAppService } from "./services/subcategory.app.service";
import { SubcategoryEntity } from "../entities/subcategory.entity";


@Module({
  controllers: [SubcategoryAppController],
  providers: [SubcategoryAppService],
  imports: [
    TypeOrmModule.forFeature([SubcategoryEntity])
  ]
})
export class CategoryAppModule {}
