import { Module } from "@nestjs/common";
import { UserAppModule } from "./app/user.app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";

@Module({
  imports: [
    UserAppModule,
    TypeOrmModule.forFeature([UserEntity])  
  ]
})
export class UserModule {}