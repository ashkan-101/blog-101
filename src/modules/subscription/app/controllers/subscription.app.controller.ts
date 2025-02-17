import { Controller, Get, UseGuards } from "@nestjs/common";
import { SubscriptionAppService } from "../services/subscription.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller('/api/v1/subscription')
export class SubscriptionAppController{
  constructor(
    private readonly subscriptionAppService: SubscriptionAppService
  ){}

  @UseGuards(JwtAppGuard)
  @Get()
  async getSubscriptions(){
    const { totalPlans, subscriptions } = await this.subscriptionAppService.findAllSubscriptions()

    return { totalPlans, subscriptions }
  }
}