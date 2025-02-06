import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { OtpEntity } from "../entities/otp.entity";
import { AuthAppController } from "./auth.app.controller";
import { AuthAppService } from "./auth.app.service";
import { AuthAppFactory } from "./auth.app.factory";
import { UserAppModule } from "../../user/app/user.app.module";
import { PassportModule } from "@nestjs/passport";
import { JwtAppStrategy } from "../guards/strategies/jwt.app.strategy";
import { JwtAppGuard } from "../guards/jwt.app.guard";
import { config } from 'dotenv'
config()

@Module({
  controllers: [AuthAppController],
  providers: [AuthAppService, AuthAppFactory, JwtAppStrategy, JwtAppGuard],
  imports: [
    UserAppModule, PassportModule,
    TypeOrmModule.forFeature([OtpEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  exports: [JwtAppGuard]
})
export class AuthAppModule{}