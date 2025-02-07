import { Module } from "@nestjs/common";
import { AuthAppModule } from "./app/auth.app.module";
import { AuthAdminModule } from "./admin/auth.admin.module";

@Module({
  imports: [
    AuthAppModule, AuthAdminModule,
  ]
})
export class AuthModule{}