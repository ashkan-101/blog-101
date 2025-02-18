import { Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { JwtAppGuard } from "../auth/guards/jwt.app.guard";


@Controller('/api/v1/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService
  ){}

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