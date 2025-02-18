import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { create, ZarinPalInstance } from 'zarinpal-checkout'
import { IPaymentProvider } from '../interfaces/IPaymentProvider';
import { IPaymentRequstInput } from '../interfaces/IPaymentRequestInput';
import { IPaymentVerifyInput } from '../interfaces/IPaymentVerifyInput';


@Injectable()
export class ZarinPal implements IPaymentProvider {
    private readonly zarinPal: ZarinPalInstance
    private readonly merchantId: string = process.env.ZARINPAL_MERCHANTID as string
  constructor(){
    this.zarinPal = create(this.merchantId, true)
  }
  
  async requestPayment(request: IPaymentRequstInput): Promise<any> {
    try {
      const requestResult = await this.zarinPal.PaymentRequest({
        Amount: request.amount,
        CallbackURL: request.callbackURL,
        Description: request.description,
        Mobile: request.mobile,
      })

      if(requestResult && requestResult.status === 100) {
        return { 
          url: requestResult.url,
          authority: requestResult.authority
        }
      }
    } catch (error) {
      throw new HttpException('failed payment proccess', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async verifyPayment(verify: IPaymentVerifyInput): Promise<any> {
    try {
      const verifyResult = await this.zarinPal.PaymentVerification({
        Amount: verify.amount,
        Authority: verify.authority
      })
      if(verifyResult.status === 100){
        return verifyResult.refId
      }
    } catch (error) {
      if(error.errors.code === -9){
        throw new BadRequestException('invalid authority')
      }
      if(error.errors.code === -50){
        throw new BadRequestException('amounts values is not the same')
      }
      throw error
    }
  }
  
}