import { Module } from "@nestjs/common";
import { UserAppController } from "./user.app.controller";
import { UserAppService } from "./user.app.service";
import { UserModule } from "../user.module";
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