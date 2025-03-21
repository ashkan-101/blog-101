import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/configs/typeOrmConfig';
import { CategoryModule } from '../category/category.module';
import { AdminModule } from '../admin/admin.module';
import { PostModule } from '../post/post.module';
import { SMSModule } from 'src/common/services/notifications/sms/sms.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from 'src/common/configs/throttlerConfig';
import { APP_GUARD } from '@nestjs/core';
import { PaymentProviderModule } from 'src/common/services/payment/payment-provider.module';
import { PaymentModule } from '../payment/payment.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule, AuthModule, CategoryModule,
    AdminModule, PostModule, SMSModule,
    PaymentProviderModule, PaymentModule,
    SubscriptionModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    ScheduleModule.forRoot()
  ],
  providers: [ 
    { provide: APP_GUARD, useClass: ThrottlerGuard } 
  ]
})
export class AppModule {}
