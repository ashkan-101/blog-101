import { Module } from "@nestjs/common";
import { UserAppModule } from "./app/user.app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserAdminModule } from "./admin/user.admin.module";

@Module({
  imports: [
    UserAppModule, UserAdminModule,
    TypeOrmModule.forFeature([UserEntity])  
  ]
})
export class UserModule {}