import { Inject, Injectable } from "@nestjs/common";
import { IPaymentProvider } from "./interfaces/IPaymentProvider";
import { IPaymentRequstInput } from "./interfaces/IPaymentRequestInput";
import { IPaymentVerifyInput } from "./interfaces/IPaymentVerifyInput";


@Injectable()
export class PaymentProviderService implements IPaymentProvider{
  constructor(
    @Inject('IPaymentProvider') private readonly paymentProvider: IPaymentProvider
  ){}

  public async requestPayment(request: IPaymentRequstInput){
    return await this.paymentProvider.requestPayment(request)
  }

  public async verifyPayment(verify: IPaymentVerifyInput) {
    return await this.paymentProvider.verifyPayment(verify)
  }
}