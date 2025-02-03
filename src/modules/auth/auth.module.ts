import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthFactory } from "./auth.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpEntity } from "./entities/otp.entity";
import { UserAppModule } from "../user/app/user.app.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthFactory],
  imports: [
    UserAppModule,
    TypeOrmModule.forFeature([OtpEntity])
  ]
})
export class AuthModule{}