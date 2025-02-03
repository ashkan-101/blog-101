import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthFactory } from "./auth.factory";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthFactory],
  imports: [UserModule]
})
export class AuthModule{}