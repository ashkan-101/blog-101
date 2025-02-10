import { Module } from "@nestjs/common";
import { UserAppController } from "./controllers/user.app.controller";
import { UserAppService } from "./services/user.app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";

@Module({ 
  controllers: [UserAppController],
  providers: [UserAppService],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [UserAppService]
})
export class UserAppModule{}