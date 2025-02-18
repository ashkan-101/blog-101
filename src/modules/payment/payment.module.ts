import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentProviderModule } from "src/common/services/payment/payment-provider.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentEntity } from "./entities/payment.entity";
import { PaymentFactory } from "./payment.factory";


@Module({
  providers: [ PaymentService, PaymentFactory ],
  controllers: [ PaymentController ],
  imports: [
    PaymentProviderModule,
    TypeOrmModule.forFeature([PaymentEntity])
  ]
})
export class PaymentModule{}