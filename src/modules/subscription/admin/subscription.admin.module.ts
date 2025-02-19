import { Module } from "@nestjs/common";
import { SubscriptionAdminController } from "./controllers/subscription.admin.controller";
import { SubscriptionAdminService } from "./services/subscription.admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionPlanEntity } from "../entities/subscription-plan.entity";
import { AuthAdminModule } from "src/modules/auth/admin/auth.admin.module";


@Module({
  controllers: [SubscriptionAdminController],
  providers: [ SubscriptionAdminService ],
  imports: [
    AuthAdminModule,
    TypeOrmModule.forFeature([SubscriptionPlanEntity])
  ]
})
export class SubscriptionAdminModule {}