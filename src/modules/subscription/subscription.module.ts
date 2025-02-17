import { Module } from "@nestjs/common";
import { SubscriptionAdminModule } from "./admin/subscription.admin.module";


@Module({
  imports: [SubscriptionAdminModule]
})
export class SubscriptionModule{}