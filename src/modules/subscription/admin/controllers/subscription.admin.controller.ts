import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SubscriptionAdminService } from "../services/subscription.admin.service";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";


@Controller('/api/v1/admin/subscription')
export class SubscriptionAdminController {
  constructor(
    private readonly subscriptionAdminService: SubscriptionAdminService
  ){}

  @UseGuards(JwtAdminGuard)
  @Post()
  async create(@Body() body: CreateSubscriptionDto){
    const newSubscription = await this.subscriptionAdminService.createNewSubscription(body)
    return { newSubscription }
  }
  
}