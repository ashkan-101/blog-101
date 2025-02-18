import { IPaymentRequstInput } from "./IPaymentRequestInput"
import { IPaymentVerifyInput } from "./IPaymentVerifyInput"

export interface IPaymentProvider {
  requestPayment(request: IPaymentRequstInput): Promise<any>
  verifyPayment(verify: IPaymentVerifyInput): Promise<any>
}