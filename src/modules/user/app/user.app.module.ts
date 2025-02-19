import { forwardRef, Module } from "@nestjs/common";
import { UserAppController } from "./controllers/user.app.controller";
import { UserAppService } from "./services/user.app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { NotificationEntity } from "../entities/notification.entity";
import { NotificationAppController } from "./controllers/notification.app.controller";
import { NotificationAppService } from "./services/notification.app.service";
import { AuthAppModule } from "src/modules/auth/app/auth.app.module";


@Module({ 
  controllers: [ UserAppController, NotificationAppController ],
  providers: [ UserAppService, NotificationAppService ],
  imports: [
    forwardRef(() => AuthAppModule),
    TypeOrmModule.forFeature([UserEntity, NotificationEntity])
  ],
  exports: [UserAppService]
})
export class UserAppModule{}