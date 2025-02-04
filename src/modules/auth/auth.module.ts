import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthFactory } from "./auth.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpEntity } from "./entities/otp.entity";
import { UserAppModule } from "../user/app/user.app.module";
import { JwtModule } from "@nestjs/jwt";
import { config } from 'dotenv'
config()

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthFactory],
  imports: [
    UserAppModule,
    TypeOrmModule.forFeature([OtpEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ]
})
export class AuthModule{}