import { Module } from "@nestjs/common";
import { AdminModule } from "src/modules/admin/admin.module";
import { AuthAdminController } from "./auth.admin.controller";
import { AuthAdminService } from "./auth.admin.service";
import { AuthAdminFactory } from "./auth.admin.factory";
import { JwtModule } from "@nestjs/jwt";


@Module({
  controllers: [ AuthAdminController ],
  providers: [ AuthAdminService, AuthAdminFactory ],
  imports: [
    AdminModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ]
})
export class AuthAdminModule{}