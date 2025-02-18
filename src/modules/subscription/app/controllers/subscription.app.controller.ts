import { Controller, Get, UseGuards } from "@nestjs/common";
import { SubscriptionAppService } from "../services/subscription.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/subscription')
export class SubscriptionAppController{
  constructor(
    private readonly subscriptionAppService: SubscriptionAppService
  ){}

  @ApiOperation({ summary: 'Get all subscriptions' }) 
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the subscription plans',
    schema: {
      type: 'object',
      properties: {
        totalPlans: {
          type: 'integer',
          example: 10,
        },
        subscriptions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Basic Plan' },
              durationDays: { type: 'integer', example: 30 },
              price: { type: 'number', example: 10000 },
            },
          },
        },
      },
    },
  })
  @UseGuards(JwtAppGuard)
  @Get()
  async getSubscriptions(){
    const { totalPlans, subscriptions } = await this.subscriptionAppService.findAllSubscriptions()

    return { totalPlans, subscriptions }
  }
}