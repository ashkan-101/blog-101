import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentProviderService } from "src/common/services/payment/payment-provider.service";
import { PaymentEntity } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { PaymentFactory } from "./payment.factory";
import { UserEntity } from "../user/entities/user.entity";


@Injectable()
export class PaymentService{
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly paymentProviderService: PaymentProviderService,
    private readonly paymentFactory: PaymentFactory
  ){}

  //-----------------------------------private methods
  private async findPaymentByAuthority(authority: string){
    const payment = await this.paymentRepository.findOne({
      where: { authority },
      order: { createdAt: 'DESC' },
      relations: ['plan', 'user']
    })
    if(!payment){
      throw new NotFoundException('not found any payment')
    }
    return payment
  }

  //-----------------------------------public methods
  public async requestPayment(subscriptionId: string, user: UserEntity){
    const subscription = await this.paymentFactory.findSubscriptionById(subscriptionId)

    const requstResult = await this.paymentProviderService.requestPayment({
      amount: subscription.price,
      description: `payment request for ${subscription.name}-${subscription.durationDays}-${subscription.price}`,
      mobile: user.mobile,
      callbackURL: 'http://localhost:3000/api/v1/payment/verify'
    })

    const newPayment = this.paymentRepository.create({
      authority: requstResult.authority,
      amount: subscription.price,
      user,
      plan: subscription
    })

    await newPayment.save()
    
    return requstResult.url
  }

  public async verifyPayment(authority: string, status: string){
    if(status === 'NOK') {
      throw new BadRequestException('payment Failed')
    }

    const payment = await this.findPaymentByAuthority(authority)
    const verifyResult = await this.paymentProviderService.verifyPayment({authority, amount: payment.amount})
    
    const endDate = new Date(Date.now() + payment.plan.durationDays * 86400000)
    const userSubscription = await this.paymentFactory.createNewUserSubscription({
      user: payment.user,
      plan: payment.plan,
      endDate: endDate
    })

    return { 
      refId: verifyResult,
      userSubscription
    }
  }
}
