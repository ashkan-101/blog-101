import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubcategoryAppController } from "./controllers/subcategory.app.controller";
import { SubcategoryAppService } from "./services/subcategory.app.service";
import { SubcategoryEntity } from "../entities/subcategory.entity";
import { AuthAppModule } from "src/modules/auth/app/auth.app.module";


@Module({
  controllers: [SubcategoryAppController],
  providers: [SubcategoryAppService],
  imports: [
    AuthAppModule,
    TypeOrmModule.forFeature([SubcategoryEntity])
  ]
})
export class CategoryAppModule {}
