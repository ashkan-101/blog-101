import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserSubscriptionAppService } from "../services/user-subscription.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller()
export class UserSubscriptionAppController{
  constructor(
    private readonly userSubscriptionAppService: UserSubscriptionAppService
  ){}

  @ApiOperation({ summary: 'Get subscriptions for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched user subscriptions by current userId in auth token',
    schema: {
      type: 'object',
      properties: {
        userSubscriptions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              plan: { 
                type: 'object', 
                properties: { name: { type: 'string' }, durationDays: { type: 'number' }  }
              },
              price: { type: 'number', example: 10000 },
              endDate: { type: 'string', format: 'date-time', example: '2025-02-18T12:00:00Z' },
              isActive: { type: 'boolean' }
            },
          },
        },
      },
    },
  })
  @UseGuards(JwtAppGuard)
  @Get()
  async getUserSubscriptions(@Req() req){
    const userId = req.user.id
    const userSubscriptions = await this.userSubscriptionAppService.findUserSubscriptionsByUserId(userId)
    return { userSubscriptions }
  }
}