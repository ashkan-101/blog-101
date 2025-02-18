import { Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { JwtAppGuard } from "../auth/guards/jwt.app.guard";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService
  ){}

  @ApiOperation({ summary: 'Request payment for a subscription' }) 
  @ApiParam({ name: 'subscriptionId', description: 'The ID of the subscription (UUID)', required: true, type: String }) 
  @ApiResponse({
    status: 200,
    description: 'Successfully generated the payment URL',
    schema: {
      type: 'object',
      properties: {
        paymentUrl: { type: 'string', example: 'http://payment-gateway.com/redirect' }, 
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format for subscriptionId',
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription not found with the given ID',
  })
  @UseGuards(JwtAppGuard)
  @Post('/request/:subscriptionId')
  async requestPayment(@Param('subscriptionId', ParseUUIDPipe) id: string, @Req() req){
    const user = req.user
    const paymentUrl = await this.paymentService.requestPayment(id, user)
    return { paymentUrl }
  }

  @Get('/verify')
  async verifyPayment(@Query('Authority') authority: string, @Query('Status') status: string){
    const result = await this.paymentService.verifyPayment(authority, status)
    return result
  }

}