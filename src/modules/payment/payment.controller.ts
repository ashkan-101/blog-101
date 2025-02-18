import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PaymentService } from "./payment.service";


@Controller('/api/v1/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService
  ){}

  @Post('/request')
  async requestPayment(){
    const result = await this.paymentService.requestPayment()
    return result
  }

  @Get('/verify')
  async verifyPayment(@Query('Authority') authority: string, @Query('Status') status: string){
    const result = await this.paymentService.verifyPayment(authority, status)
    return result
  }

}