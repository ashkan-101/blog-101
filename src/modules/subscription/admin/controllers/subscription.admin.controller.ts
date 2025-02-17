import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { SubscriptionAdminService } from "../services/subscription.admin.service";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

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
  
  @ApiOperation({
    summary: 'Retrieve all subscription plans -- ADMIN',
    description: 'This endpoint is used to retrieve all subscription plans along with the total count.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all subscription plans.',
    schema: {
      example: {
        totalPlans: 5,
        subscriptions: [
          {
            id: 1,
            name: 'Basic Plan',
            price: 10,
            durationDays: 30,
          },
          {
            id: 2,
            name: 'Premium Plan',
            price: 50,
            durationDays: 30,
          },
        ],
      },
    },
  })
  @UseGuards(JwtAdminGuard)
  @Get()
  async getSubscriptions(){
    const { totalPlans, subscriptions } = await this.subscriptionAdminService.findAllSubscriptions()
    return { totalPlans, subscriptions }
  }

  @ApiOperation({
    summary: 'Delete a subscription plan by ID -- ADMIN',
    description: 'This endpoint is used to delete a subscription plan by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the subscription plan to be deleted.(UUID)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The subscription plan was successfully deleted.',
    schema: {
      example: {
        deleteResult: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'The subscription plan with the provided ID was not found.',
  })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string){
    await this.subscriptionAdminService.deleteSubscriptionById(id)

    return { deleteResult: true }
  }
} 