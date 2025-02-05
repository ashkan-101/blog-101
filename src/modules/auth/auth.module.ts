import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthFactory } from "./auth.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpEntity } from "./entities/otp.entity";
import { UserAppModule } from "../user/app/user.app.module";
import { JwtModule } from "@nestjs/jwt";
import { config } from 'dotenv'
import { JwtStrategy } from "./guards/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtGuard } from "./guards/jwt.guard";
config()

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthFactory, JwtStrategy, JwtGuard],
  imports: [
    UserAppModule, PassportModule,
    TypeOrmModule.forFeature([OtpEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  exports: [JwtGuard]
})
export class AuthModule{}