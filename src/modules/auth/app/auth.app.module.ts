import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { OtpEntity } from "../entities/otp.entity";
import { AuthAppController } from "./auth.app.controller";
import { AuthAppService } from "./auth.app.service";
import { AuthAppFactory } from "./auth.app.factory";
import { UserAppModule } from "../../user/app/user.app.module";
import { JwtAppGuard } from "../guards/jwt.app.guard";
import { config } from 'dotenv'
import { SMSModule } from "src/common/services/notifications/sms/sms.module";
config()

@Module({
  controllers: [ AuthAppController ],
  providers: [ JwtAppGuard, AuthAppService, AuthAppFactory ],
  imports: [
    SMSModule,
    forwardRef(() => UserAppModule),
    TypeOrmModule.forFeature([OtpEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  exports: [ JwtAppGuard, AuthAppFactory, JwtModule]
})
export class AuthAppModule{}