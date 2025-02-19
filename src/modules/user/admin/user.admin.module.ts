import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { NotificationEntity } from "../entities/notification.entity";
import { NotificationAdminController } from "./controllers/notification.admin.controller";
import { NotificationAdminService } from "./services/notification.admin.service";
import { UserAdminFactory } from "./user.admin.factory";
import { UserAppModule } from "../app/user.app.module";
import { AuthAdminModule } from "src/modules/auth/admin/auth.admin.module";

@Module({ 
  controllers: [NotificationAdminController],
  providers: [UserAdminFactory, NotificationAdminService],
  imports: [
    UserAppModule, AuthAdminModule,
    TypeOrmModule.forFeature([UserEntity, NotificationEntity])
  ],
  exports: []
})
export class UserAdminModule{}