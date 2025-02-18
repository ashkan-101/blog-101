import { Module } from "@nestjs/common";
import { ZarinPal } from "./providers/zarinpal";
import { PaymentProviderService } from "./payment-provider.service";


@Module({
  providers: [ 
    PaymentProviderService,
    {
      provide: 'IPaymentProvider',
      useClass: ZarinPal
    }
  ],
  exports: [PaymentProviderService]
})
export class PaymentProviderModule {}