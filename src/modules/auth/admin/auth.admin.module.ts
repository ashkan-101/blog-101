import { Module } from "@nestjs/common";
import { AdminModule } from "src/modules/admin/admin.module";
import { AuthAdminController } from "./auth.admin.controller";
import { AuthAdminService } from "./auth.admin.service";
import { AuthAdminFactory } from "./auth.admin.factory";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtAdminGuard } from "../guards/jwt.admin.guard";


@Module({
  controllers: [ AuthAdminController ],
  providers: [ AuthAdminService, AuthAdminFactory, JwtAdminGuard ],
  imports: [
    AdminModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  exports: [ JwtAdminGuard, AuthAdminFactory,  JwtModule]
})
export class AuthAdminModule{}