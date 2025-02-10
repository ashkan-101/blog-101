import { Module } from "@nestjs/common";
import { UserAppController } from "./controllers/user.app.controller";
import { UserAppService } from "./services/user.app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { NotificationEntity } from "../entities/notification.entity";
import { NotificationAppController } from "./controllers/notification.app.controller";
import { NotificationAppService } from "./services/notification.app.service";
import { UserAppFactory } from "./user.app.factory";

@Module({ 
  controllers: [ UserAppController, NotificationAppController ],
  providers: [ UserAppService, NotificationAppService ],
  imports: [
    TypeOrmModule.forFeature([UserEntity, NotificationEntity])
  ],
  exports: [UserAppService]
})
export class UserAppModule{}