import { Module } from "@nestjs/common";
import { SubscriptionAppController } from "./controllers/subscription.app.controller";
import { UserSubscriptionAppController } from "./controllers/user-subscription.app.controller";
import { SubscriptionAppService } from "./services/subscription.app.service";
import { UserSubscriptionAppService } from "./services/user-subscription.app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubscriptionEntity } from "../entities/user-subscription.entity";
import { SubscriptionPlanEntity } from "../entities/subscription-plan.entity";
import { AuthAppModule } from "src/modules/auth/app/auth.app.module";

@Module({
  controllers: [ SubscriptionAppController, UserSubscriptionAppController ],
  providers: [ SubscriptionAppService, UserSubscriptionAppService ],
  imports: [
    AuthAppModule,
    TypeOrmModule.forFeature([UserSubscriptionEntity, SubscriptionPlanEntity])
  ],
  exports: [
    SubscriptionAppService, 
    UserSubscriptionAppService
  ]
})
export class SubscriptionAppModule{}