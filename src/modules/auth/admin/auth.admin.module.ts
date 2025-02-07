import { Module } from "@nestjs/common";
import { AdminModule } from "src/modules/admin/admin.module";
import { AuthAdminController } from "./auth.admin.controller";
import { AuthAdminService } from "./auth.admin.service";
import { AuthAdminFactory } from "./auth.admin.factory";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdminGuard } from "../guards/jwt.admin.guard";
import { JwtAdminStrategy } from "../guards/strategies/jwt.admin.strategy";
import { PassportModule } from "@nestjs/passport";


@Module({
  controllers: [ AuthAdminController ],
  providers: [ AuthAdminService, AuthAdminFactory, JwtAdminGuard, JwtAdminStrategy ],
  imports: [
    AdminModule, PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  exports: [JwtAdminGuard]
})
export class AuthAdminModule{}