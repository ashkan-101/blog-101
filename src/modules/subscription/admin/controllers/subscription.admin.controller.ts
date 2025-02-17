import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SubscriptionAdminService } from "../services/subscription.admin.service";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/api/v1/admin/subscription')
export class SubscriptionAdminController {
  constructor(
    private readonly subscriptionAdminService: SubscriptionAdminService
  ){}

  @ApiOperation({
    summary: 'Create a new subscription plan by ADMIN',
    description: 'This endpoint is used to create a new subscription plan in the system.',
  })
  @ApiBody({
    description: 'The data required to create a new subscription plan.',
    type: CreateSubscriptionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The new subscription plan has been successfully created.',
    schema: {
      example: {
        newSubscription: {
          id: 1,
          name: 'Premium Plan',
          price: 50,
          duration: 30,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. The provided data is invalid.',
  })
  @UseGuards(JwtAdminGuard)
  @Post()
  async create(@Body() body: CreateSubscriptionDto){
    const newSubscription = await this.subscriptionAdminService.createNewSubscription(body)
    return { newSubscription }
  }
  
}