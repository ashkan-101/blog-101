import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentProviderService } from "src/common/services/payment/payment-provider.service";
import { PaymentEntity } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { PaymentFactory } from "./payment.factory";


@Injectable()
export class PaymentService{
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly paymentProviderService: PaymentProviderService,
    private readonly paymentFactory: PaymentFactory
  ){}

  public async requestPayment(){
     await this.paymentProviderService.requestPayment({
      amount: 10000,
      description: 'test test',
      mobile: '0900202002',
      callbackURL: 'http://localhost:3000/api/v1/payment/verify'
    })

  }

  public async verifyPayment(authority: string, status: string){
    if(status === 'NOK') throw new BadRequestException('payment Failed')
    await this.paymentProviderService.verifyPayment({authority, amount: 1000})
  }

}
